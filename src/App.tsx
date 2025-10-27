import React, { useState } from 'react';
import { Header } from './components/Header/Header';
import { DateSelector } from './components/DateSelector/DateSelector';
import { VisitList } from './components/VisitList/VisitList';
import { VisitModal } from './components/VisitModal/VisitModal';
import { Visit } from './types/visit';
import { GlobalStyles } from './App.styles';

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
      // Editar visita existente
      setVisits(visits.map(v => 
        v.id === editingVisit.id 
          ? { ...visitData, id: editingVisit.id, status: editingVisit.status }
          : v
      ));
    } else {
      // Criar nova visita
      const newVisit: Visit = {
        ...visitData,
        id: Date.now().toString(), // ID temporário
        status: 'pendente'
      };
      setVisits([...visits, newVisit]);
    }
  };

  const handleEditVisit = (visit: Visit) => {
    setEditingVisit(visit);
    setIsModalOpen(true);
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