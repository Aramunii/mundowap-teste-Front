import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: #2c3e50;
  color: white;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;

export const AddButton = styled.button`
  background-color: #27ae60;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s;

  &:hover {
    background-color: #229954;
  }
`;