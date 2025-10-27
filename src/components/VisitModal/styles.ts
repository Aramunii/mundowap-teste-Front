import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

export const ModalContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 30px;
  border-bottom: 2px solid #e9ecef;
  background-color: #f8f9fa;
  border-radius: 12px 12px 0 0;
`;

export const ModalTitle = styled.h2`
  font-size: 24px;
  color: #2c3e50;
  font-weight: 600;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  color: #7f8c8d;
  cursor: pointer;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.3s;

  &:hover {
    background-color: #e9ecef;
    color: #2c3e50;
  }
`;

export const ModalBody = styled.div`
  padding: 30px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  &:only-child {
    grid-column: 1 / -1;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #34495e;
  letter-spacing: 0.3px;
`;

export const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #bdc3c7;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }

  &:disabled {
    background-color: #ecf0f1;
    color: #7f8c8d;
    cursor: not-allowed;
    border-color: #d5dbdb;
  }

  &::placeholder {
    color: #95a5a6;
  }

  /* Remove setas do input number */
  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

export const ErrorMessage = styled.span`
  font-size: 13px;
  color: #e74c3c;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;

  &::before {
    content: '⚠️';
  }
`;

export const LoadingMessage = styled.span`
  font-size: 13px;
  color: #3498db;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;

  &::before {
    content: '🔄';
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const InfoMessage = styled.div`
  background-color: #e8f4f8;
  border-left: 4px solid #3498db;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  color: #2c3e50;
  font-weight: 500;
  line-height: 1.6;
`;

export const WarningMessage = styled.div`
  background-color: #fff3cd;
  border-left: 4px solid #f39c12;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  color: #856404;
  font-weight: 600;
  line-height: 1.6;
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% {
      background-color: #fff3cd;
    }
    50% {
      background-color: #ffe8a1;
    }
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 24px;
  border-top: 2px solid #e9ecef;
  margin-top: 10px;
`;

export const CancelButton = styled.button`
  padding: 12px 24px;
  border: 2px solid #bdc3c7;
  background-color: white;
  color: #34495e;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #ecf0f1;
    border-color: #95a5a6;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const SubmitButton = styled.button`
  padding: 12px 24px;
  border: none;
  background-color: #27ae60;
  color: white;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: #229954;
    box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;