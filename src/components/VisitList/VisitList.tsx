import React from 'react';
import { Visit } from '../../types/visit';
import { 
  Container, 
  Title, 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableCell,
  TableHeaderCell,
  StatusBadge,
  EditButton,
  EmptyMessage 
} from './styles';

interface VisitListProps {
  visits: Visit[];
  selectedDate: string;
  onEditVisit: (visit: Visit) => void;
}

export const VisitList: React.FC<VisitListProps> = ({ visits, selectedDate, onEditVisit }) => {
  const filteredVisits = visits.filter(visit => 
    visit.data.split('T')[0] === selectedDate
  );

  if (filteredVisits.length === 0) {
    return (
      <Container>
        <Title>Visitas do Dia</Title>
        <EmptyMessage>Nenhuma visita agendada para esta data</EmptyMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Visitas do Dia ({filteredVisits.length})</Title>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Formulários</TableHeaderCell>
            <TableHeaderCell>Produtos</TableHeaderCell>
            <TableHeaderCell>Endereço</TableHeaderCell>
            <TableHeaderCell>Bairro</TableHeaderCell>
            <TableHeaderCell>Cidade/UF</TableHeaderCell>
            <TableHeaderCell>CEP</TableHeaderCell>
            <TableHeaderCell>Ações</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredVisits.map(visit => (
            <TableRow key={visit.id}>
              <TableCell>
                <StatusBadge status={visit.status}>
                  {visit.status === 'pendente' ? '⏳ Pendente' : '✅ Concluído'}
                </StatusBadge>
              </TableCell>
              <TableCell>{visit.quantidadeFormularios}</TableCell>
              <TableCell>{visit.quantidadeProdutos}</TableCell>
              <TableCell>
                {visit.endereco.logradouro}, {visit.endereco.numero}
                {visit.endereco.complemento && ` - ${visit.endereco.complemento}`}
              </TableCell>
              <TableCell>{visit.endereco.bairro}</TableCell>
              <TableCell>{visit.endereco.cidade} - {visit.endereco.uf}</TableCell>
              <TableCell>{visit.endereco.cep}</TableCell>
              <TableCell>
                <EditButton onClick={() => onEditVisit(visit)}>
                  ✏️ Editar
                </EditButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};