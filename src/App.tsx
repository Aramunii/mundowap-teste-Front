import React, { useState } from 'react';
import { Header } from './components/Header/Header';
import { DateSelector } from './components/DateSelector/DateSelector';
import { VisitList } from './components/VisitList/VisitList';
import { VisitModal } from './components/VisitModal/VisitModal';
import { Visit } from './types/visit';
import { GlobalStyles } from './App.styles';
import { showSuccess, showConfirm } from './utils/alerts';
import { closeDateAndRelocateVisits } from './utils/dateUtils';
import { useVisits } from './hooks/useVisits';

function App() {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVisit, setEditingVisit] = useState<Visit | null>(null);

  const {
    visits,
    isLoading,
    addVisit,
    updateVisit,
    completeVisit,
    replaceAllVisits
  } = useVisits();

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
      updateVisit(editingVisit.id, visitData);
    } else {
      addVisit(visitData);
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
      completeVisit(visitId);
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
      replaceAllVisits(relocatedVisits);
      showSuccess(
        'Data Fechada!',
        'As visitas pendentes foram realocadas para os próximos dias.'
      );
    }
  };

  if (isLoading) {
    return (
      <>
        <GlobalStyles />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '20px',
          color: '#7f8c8d'
        }}>
          Carregando visitas...
        </div>
      </>
    );
  }

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
        initialDate={selectedDate}
      />
    </>
  );
}

export default App;