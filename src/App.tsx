import React, { useState } from 'react';
import { Header } from './components/Header/Header';
import { DateSelector } from './components/DateSelector/DateSelector';
import { VisitList } from './components/VisitList/VisitList';
import { VisitModal } from './components/VisitModal/VisitModal';
import { Visit } from './types/visit';
import { GlobalStyles } from './App.styles';
import { showSuccess, showConfirm } from './utils/alerts';
import { closeDateAndRelocateVisits } from './utils/dateUtils';

function App() {

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVisit, setEditingVisit] = useState<Visit | null>(null);

  const [visits, setVisits] = useState<Visit[]>([
    {
      id: '1',
      data: new Date().toISOString(),
      status: 'pendente',
      quantidadeFormularios: 3,
      quantidadeProdutos: 5,
      endereco: {
        cep: '01310-100',
        uf: 'SP',
        cidade: 'São Paulo',
        logradouro: 'Avenida Paulista',
        bairro: 'Bela Vista',
        numero: '1578',
        complemento: ''
      }
    },
    {
      id: '2',
      data: new Date().toISOString(),
      status: 'concluido',
      quantidadeFormularios: 2,
      quantidadeProdutos: 3,
      endereco: {
        cep: '01310-200',
        uf: 'SP',
        cidade: 'São Paulo',
        logradouro: 'Rua Augusta',
        bairro: 'Consolação',
        numero: '2000',
        complemento: 'Apto 101'
      }
    },
    {
      id: '3',
      data: new Date().toISOString(),
      status: 'pendente',
      quantidadeFormularios: 1,
      quantidadeProdutos: 2,
      endereco: {
        cep: '01310-300',
        uf: 'SP',
        cidade: 'São Paulo',
        logradouro: 'Rua da Consolação',
        bairro: 'Consolação',
        numero: '100',
        complemento: ''
      }
    }
  ]);

  const handleOpenModal = () => {
    setEditingVisit(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingVisit(null);
  };

  const handleSaveVisit = (visitData: Omit<Visit, 'id'>) => {
    if (editingVisit) {
      setVisits(visits.map(v => 
        v.id === editingVisit.id 
          ? { ...visitData, id: editingVisit.id, status: editingVisit.status }
          : v
      ));
    } else {
      const newVisit: Visit = {
        ...visitData,
        id: Date.now().toString(),
        status: 'pendente'
      };
      setVisits([...visits, newVisit]);
    }
  };

  const handleEditVisit = (visit: Visit) => {
    setEditingVisit(visit);
    setIsModalOpen(true);
  };

  const handleCompleteVisit = async (visitId: string) => {
    const result = await showConfirm(
      'Concluir Visita',
      'Tem certeza que deseja marcar esta visita como concluída?'
    );

    if (result.isConfirmed) {
      setVisits(visits.map(v =>
        v.id === visitId
          ? { ...v, status: 'concluido' as const }
          : v
      ));
      showSuccess('Sucesso!', 'Visita marcada como concluída!');
    }
  };

  const handleCloseDate = async (date: string) => {
    const result = await showConfirm(
      'Fechar Data',
      'Todas as visitas pendentes serão movidas para os próximos dias disponíveis. Deseja continuar?'
    );

    if (result.isConfirmed) {
      const relocatedVisits = closeDateAndRelocateVisits(visits, date);
      setVisits(relocatedVisits);
      showSuccess(
        'Data Fechada!',
        'As visitas pendentes foram realocadas para os próximos dias.'
      );
    }
  };

  return (
    <>
      <GlobalStyles />
      <Header onOpenModal={handleOpenModal} />
      <DateSelector 
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      <VisitList 
        visits={visits}
        selectedDate={selectedDate}
        onEditVisit={handleEditVisit}
        onCompleteVisit={handleCompleteVisit}
        onCloseDate={handleCloseDate}
      />
      <VisitModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveVisit}
        visits={visits}
        editingVisit={editingVisit}
      />
    </>
  );
}

export default App;