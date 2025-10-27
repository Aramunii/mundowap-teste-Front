import React from 'react';
import { Container, Label, Input } from './styles';

interface DateSelectorProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({ selectedDate, onDateChange }) => {
  return (
    <Container>
      <Label>Selecionar Data:</Label>
      <Input 
        type="date" 
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
      />
    </Container>
  );
};