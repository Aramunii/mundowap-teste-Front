import React from 'react';
import { HeaderContainer, Title, AddButton } from './styles';

interface HeaderProps {
  onOpenModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  return (
    <HeaderContainer>
      <Title>Gerenciamento de Visitas</Title>
      <AddButton onClick={onOpenModal}>
        REGISTRAR VISITA
      </AddButton>
    </HeaderContainer>
  );
};