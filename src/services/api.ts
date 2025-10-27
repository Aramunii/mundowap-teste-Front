import axios from 'axios';

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

const viaCepApi = axios.create({
  baseURL: 'https://viacep.com.br/ws',
});

export const getAddressByCep = async (cep: string): Promise<ViaCepResponse> => {
  // Remove caracteres não numéricos do CEP
  const cleanCep = cep.replace(/\D/g, '');
  
  // Valida se o CEP tem 8 dígitos
  if (cleanCep.length !== 8) {
    throw new Error('CEP inválido');
  }

  try {
    const response = await viaCepApi.get<ViaCepResponse>(`/${cleanCep}/json/`);
    
    if (response.data.erro) {
      throw new Error('CEP não encontrado');
    }
    
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar CEP');
  }
};