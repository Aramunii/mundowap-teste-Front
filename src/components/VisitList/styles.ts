import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px 40px;
`;

export const Title = styled.h2`
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 25px;
  font-weight: 700;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  background-color: #34495e;
  color: white;
`;

export const TableBody = styled.tbody`
  
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }

  border-bottom: 1px solid #dee2e6;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const TableHeaderCell = styled.th`
  padding: 15px;
  text-align: left;
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &:first-child {
    padding-left: 30px;
  }
  
  &:last-child {
    padding-right: 30px;
  }
`;

export const TableCell = styled.td`
  padding: 15px;
  color: #2c3e50;
  font-size: 14px;
  vertical-align: middle;
  
  &:first-child {
    padding-left: 30px;
  }
  
  &:last-child {
    padding-right: 30px;
  }
`;

export const StatusBadge = styled.span<{ status: 'pendente' | 'concluido' }>`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  background-color: ${props => props.status === 'concluido' ? '#d4edda' : '#fff3cd'};
  color: ${props => props.status === 'concluido' ? '#155724' : '#856404'};
  border: 1px solid ${props => props.status === 'concluido' ? '#c3e6cb' : '#ffeaa7'};
  white-space: nowrap;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const EditButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s;
  white-space: nowrap;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const CompleteButton = styled.button`
  background-color: #27ae60;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s;
  white-space: nowrap;

  &:hover {
    background-color: #229954;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(39, 174, 96, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const EmptyMessage = styled.div`
  text-align: center;
  color: #7f8c8d;
  font-size: 16px;
  padding: 60px 40px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;