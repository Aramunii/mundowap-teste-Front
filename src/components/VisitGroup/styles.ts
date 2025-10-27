import styled from 'styled-components';

export const GroupContainer = styled.div`
  margin-bottom: 30px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const GroupHeader = styled.div`
  background: linear-gradient(135deg, #34495e 0%, #2e3b49ff 100%);
  color: white;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const DateTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.5px;
`;

export const ProgressSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ProgressLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
  opacity: 0.95;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ProgressFill = styled.div<{ percentage: number; color: string }>`
  height: 100%;
  width: ${props => Math.min(props.percentage, 100)}%;
  background-color: ${props => props.color};
  border-radius: 6px;
  transition: width 0.3s ease, background-color 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const ProgressText = styled.div`
  font-size: 12px;
  margin-top: 6px;
  font-weight: 600;
  opacity: 0.95;
`;

export const CloseButton = styled.button`
  align-self: flex-start;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    border-color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const VisitsList = styled.div`
  padding: 0;
`;