import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Visit, VisitFormData } from '../../types/visit';
import { getAddressByCep } from '../../services/api';
import { canAddVisit, calculateVisitDuration, formatMinutes, getTotalMinutesByDate, MAX_MINUTES_PER_DAY } from '../../utils/dateUtils';
import { showTimeError, showSuccess } from '../../utils/alerts';
import {
  Overlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  Form,
  FormRow,
  FormGroup,
  Label,
  Input,
  ErrorMessage,
  LoadingMessage,
  ModalFooter,
  CancelButton,
  SubmitButton,
  InfoMessage,
  WarningMessage
} from './styles';

interface VisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (visit: Omit<Visit, 'id'>) => void;
  visits: Visit[];
  editingVisit?: Visit | null;
}

export const VisitModal: React.FC<VisitModalProps> = ({
  isOpen,
  onClose,
  onSave,
  visits,
  editingVisit
}) => {
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [cepError, setCepError] = useState('');
  const [canEditBairro, setCanEditBairro] = useState(false);
  const [canEditLogradouro, setCanEditLogradouro] = useState(false);
  const [canEditUf, setCanEditUf] = useState(false);
  const [canEditCidade, setCanEditCidade] = useState(false);


  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid }
  } = useForm<VisitFormData>({
    mode: 'onChange'
  });

  // Efeito para resetar e preencher o formulário quando o modal abre ou editingVisit muda
  useEffect(() => {
    if (isOpen) {
      if (editingVisit) {
        // Modo edição - preenche com dados da visita
        const dateOnly = editingVisit.data.split('T')[0];
        
        reset({
          data: dateOnly,
          quantidadeFormularios: editingVisit.quantidadeFormularios.toString(),
          quantidadeProdutos: editingVisit.quantidadeProdutos.toString(),
          cep: editingVisit.endereco.cep,
          uf: editingVisit.endereco.uf,
          cidade: editingVisit.endereco.cidade,
          logradouro: editingVisit.endereco.logradouro,
          bairro: editingVisit.endereco.bairro,
          numero: editingVisit.endereco.numero,
          complemento: editingVisit.endereco.complemento || ''
        });
        
        // Habilita edição de campos do endereço
        setCanEditLogradouro(true);
        setCanEditBairro(true);
      } else {
        // Modo criação - limpa o formulário
        reset({
          data: '',
          quantidadeFormularios: '',
          quantidadeProdutos: '',
          cep: '',
          uf: '',
          cidade: '',
          logradouro: '',
          bairro: '',
          numero: '',
          complemento: ''
        });
        
        setCanEditLogradouro(false);
        setCanEditBairro(false);
      }
      
      setCepError('');
    }
  }, [isOpen, editingVisit, reset]);

  const cepValue = watch('cep');
  const dataValue = watch('data');
  const quantidadeFormularios = watch('quantidadeFormularios');
  const quantidadeProdutos = watch('quantidadeProdutos');

  // Observa mudanças no CEP (apenas em modo criação ou quando CEP realmente muda)
  useEffect(() => {
    if (!isOpen) return;
    
    const cleanCep = cepValue?.replace(/\D/g, '');
    
    if (cleanCep && cleanCep.length === 8) {
      // Verifica se o CEP mudou em relação ao original (em modo edição)
      const originalCep = editingVisit?.endereco.cep.replace(/\D/g, '');
      
      if (!editingVisit || cleanCep !== originalCep) {
        fetchAddress(cleanCep);
      }
    } else if (cepValue && cepValue.length > 0) {
      // Limpa campos quando CEP está incompleto
      if (!editingVisit) {
        setValue('uf', '');
        setValue('cidade', '');
        setValue('logradouro', '');
        setValue('bairro', '');
        setCanEditBairro(false);
        setCanEditLogradouro(false);
      }
      setCepError('');
    }
  }, [cepValue, isOpen]);

  const fetchAddress = async (cep: string) => {
    setIsLoadingCep(true);
    setCepError('');
    
    // Limpa campos durante a busca
    setValue('uf', '');
    setValue('cidade', '');
    setValue('logradouro', '');
    setValue('bairro', '');
    setCanEditBairro(false);
    setCanEditLogradouro(false);

    try {
      const address = await getAddressByCep(cep);
      
      setValue('uf', address.uf);
      setValue('cidade', address.localidade);
      setValue('logradouro', address.logradouro);
      setValue('bairro', address.bairro);
      
      setCanEditLogradouro(!address.logradouro || address.logradouro.length === 0);
      setCanEditBairro(!address.bairro || address.bairro.length === 0);
      
    } catch (error) {
      setCepError('CEP não encontrado');
      setCanEditBairro(true);
      setCanEditLogradouro(true);
    } finally {
      setIsLoadingCep(false);
    }
  };

  const onSubmit = async (data: VisitFormData) => {
    const validation = canAddVisit(
      visits,
      data.data,
      parseInt(data.quantidadeFormularios),
      parseInt(data.quantidadeProdutos),
      editingVisit?.id
    );

    if (!validation.canAdd) {
      await showTimeError(
        validation.availableMinutes,
        validation.requiredMinutes,
        formatMinutes
      );
      return;
    }

    const visit: Omit<Visit, 'id'> = {
      data: new Date(data.data + 'T00:00:00').toISOString(),
      status: editingVisit?.status || 'pendente',
      quantidadeFormularios: parseInt(data.quantidadeFormularios),
      quantidadeProdutos: parseInt(data.quantidadeProdutos),
      endereco: {
        cep: data.cep,
        uf: data.uf,
        cidade: data.cidade,
        logradouro: data.logradouro,
        bairro: data.bairro,
        numero: data.numero,
        complemento: data.complemento || ''
      }
    };

    onSave(visit);
    
    if (editingVisit) {
      showSuccess('Sucesso!', 'Visita atualizada com sucesso!');
    } else {
      showSuccess('Sucesso!', 'Visita criada com sucesso!');
    }
    
    handleClose();
  };

  const handleClose = () => {
    reset();
    setCepError('');
    setCanEditBairro(false);
    setCanEditLogradouro(false);
    setCanEditUf(false);
    setCanEditCidade(false);
    onClose();
  };

  // Calcula a duração estimada da visita
  const estimatedDuration = calculateVisitDuration(
    parseInt(quantidadeFormularios) || 0,
    parseInt(quantidadeProdutos) || 0
  );

  // Calcula o tempo já ocupado na data selecionada
  const usedMinutes = dataValue 
    ? getTotalMinutesByDate(
        visits.filter(v => v.id !== editingVisit?.id),
        dataValue
      )
    : 0;

  // Calcula o tempo disponível
  const availableMinutes = MAX_MINUTES_PER_DAY - usedMinutes;

  const willExceedLimit = estimatedDuration > availableMinutes;

  if (!isOpen) return null;

  return (
    <Overlay onClick={handleClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            {editingVisit ? 'Editar Visita' : 'Nova Visita'}
          </ModalTitle>
          <CloseButton onClick={handleClose}>✕</CloseButton>
        </ModalHeader>

        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow>
              <FormGroup>
                <Label>Data da Visita *</Label>
                <Input
                  type="date"
                  {...register('data', { required: 'Data é obrigatória' })}
                />
                {errors.data && <ErrorMessage>{errors.data.message}</ErrorMessage>}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label>Quantidade de Formulários *</Label>
                <Input
                  type="number"
                  min="0"
                  {...register('quantidadeFormularios', {
                    required: 'Quantidade de formulários é obrigatória',
                    min: { value: 0, message: 'Valor deve ser maior ou igual a 0' }
                  })}
                />
                {errors.quantidadeFormularios && (
                  <ErrorMessage>{errors.quantidadeFormularios.message}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <Label>Quantidade de Produtos *</Label>
                <Input
                  type="number"
                  min="0"
                  {...register('quantidadeProdutos', {
                    required: 'Quantidade de produtos é obrigatória',
                    min: { value: 0, message: 'Valor deve ser maior ou igual a 0' }
                  })}
                />
                {errors.quantidadeProdutos && (
                  <ErrorMessage>{errors.quantidadeProdutos.message}</ErrorMessage>
                )}
              </FormGroup>
            </FormRow>

            {estimatedDuration > 0 && !willExceedLimit && (
              <InfoMessage>
                 Duração estimada: {formatMinutes(estimatedDuration)}
                {dataValue && (
                  <>
                    <br />
                    Tempo disponível na data: {formatMinutes(availableMinutes)}
                  </>
                )}
              </InfoMessage>
            )}

            {willExceedLimit && dataValue && (
              <WarningMessage>
                ATENÇÃO: Limite de 8 horas ultrapassado!
                <br />
                Duração da visita: {formatMinutes(estimatedDuration)}
                <br />
                Tempo disponível: {formatMinutes(availableMinutes)}
                <br />
                Excedente: {formatMinutes(estimatedDuration - availableMinutes)}
              </WarningMessage>
            )}

            <FormRow>
              <FormGroup>
                <Label>CEP *</Label>
                <Input
                  type="text"
                  maxLength={9}
                  placeholder="00000-000"
                  {...register('cep', {
                    required: 'CEP é obrigatório',
                    pattern: {
                      value: /^\d{5}-?\d{3}$/,
                      message: 'CEP inválido'
                    }
                  })}
                />
                {errors.cep && <ErrorMessage>{errors.cep.message}</ErrorMessage>}
                {cepError && <ErrorMessage>{cepError}</ErrorMessage>}
                {isLoadingCep && <LoadingMessage>Buscando CEP...</LoadingMessage>}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label>UF</Label>
                <Input
                  type="text"
                  {...register('uf')}
                  disabled
                  readOnly
                />
              </FormGroup>

              <FormGroup>
                <Label>Cidade</Label>
                <Input
                  type="text"
                  {...register('cidade')}
                  disabled
                  readOnly
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label>Logradouro *</Label>
                <Input
                  type="text"
                  {...register('logradouro', { required: 'Logradouro é obrigatório' })}
                  disabled={isLoadingCep || (!canEditLogradouro && !editingVisit)}
                />
                {errors.logradouro && <ErrorMessage>{errors.logradouro.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>Bairro *</Label>
                <Input
                  type="text"
                  {...register('bairro', { required: 'Bairro é obrigatório' })}
                  disabled={isLoadingCep || (!canEditBairro && !editingVisit)}
                />
                {errors.bairro && <ErrorMessage>{errors.bairro.message}</ErrorMessage>}
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label>Número *</Label>
                <Input
                  type="text"
                  {...register('numero', { required: 'Número é obrigatório' })}
                />
                {errors.numero && <ErrorMessage>{errors.numero.message}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>Complemento</Label>
                <Input
                  type="text"
                  {...register('complemento')}
                />
              </FormGroup>
            </FormRow>

            <ModalFooter>
              <CancelButton type="button" onClick={handleClose}>
                Cancelar
              </CancelButton>
              <SubmitButton type="submit" disabled={!isValid}>
                {editingVisit ? 'Salvar Alterações' : 'Criar Visita'}
              </SubmitButton>
            </ModalFooter>
          </Form>
        </ModalBody>
      </ModalContainer>
    </Overlay>
  );
};