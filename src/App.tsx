import React, { useState } from 'react';
import { Header } from './components/Header/Header';
import { DateSelector } from './components/DateSelector/DateSelector';
import { VisitList } from './components/VisitList/VisitList';
import { Visit } from './types/visit';
import { GlobalStyles } from './App.styles';

function App() {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // Dados de exemplo (depois vamos substituir por dados reais)
  const [visits] = useState<Visit[]>([
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
        complemento: 'Apto 12'
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
        complemento: 'Casa'
      }
    }
  ]);

  const handleOpenModal = () => {
    alert('Modal de registro será criado em seguida!');
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
      />
    </>
  );
}

export default App;