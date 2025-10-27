import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px 40px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: #2c3e50;
`;

export const Input = styled.input`
  padding: 10px 15px;
  border: 2px solid #bdc3c7;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;