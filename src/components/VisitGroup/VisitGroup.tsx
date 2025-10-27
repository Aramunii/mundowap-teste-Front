import React from 'react';
import { Visit } from '../../types/visit';
import {
  formatDateHeader,
  getScheduledPercentage,
  getCompletedPercentage,
  getCompletionColor,
  getTotalMinutesByDate,
  getCompletedMinutesByDate,
  formatMinutes,
  MAX_MINUTES_PER_DAY
} from '../../utils/dateUtils';
import {
  GroupContainer,
  GroupHeader,
  DateTitle,
  ProgressSection,
  ProgressLabel,
  ProgressBar,
  ProgressFill,
  ProgressText,
  CloseButton,
  VisitsList
} from './styles';

interface VisitGroupProps {
  date: string;
  visits: Visit[];
  onCloseDate: (date: string) => void;
  children: React.ReactNode;
}

export const VisitGroup: React.FC<VisitGroupProps> = ({
  date,
  visits,
  onCloseDate,
  children
}) => {
  const scheduledPercentage = getScheduledPercentage(visits, date);
  const completedPercentage = getCompletedPercentage(visits, date);
  const completionColor = getCompletionColor(completedPercentage);
  
  const totalMinutes = getTotalMinutesByDate(visits, date);
  const completedMinutes = getCompletedMinutesByDate(visits, date);
  
  const hasPendingVisits = visits.some(
    v => v.data.split('T')[0] === date && v.status === 'pendente'
  );

  return (
    <GroupContainer>
      <GroupHeader>
        <DateTitle>{formatDateHeader(date)}</DateTitle>
        
        <ProgressSection>

          <div>
            <ProgressLabel>Progresso de Conclusão</ProgressLabel>
            <ProgressBar>
              <ProgressFill 
                percentage={completedPercentage} 
                color={completionColor}
              />
            </ProgressBar>
            <ProgressText style={{ color: completionColor }}>
              {formatMinutes(completedMinutes)} concluídos ({completedPercentage}%)
            </ProgressText>
          </div>
        </ProgressSection>
        
        {hasPendingVisits && (
          <CloseButton onClick={() => onCloseDate(date)}>
            Fechar Data
          </CloseButton>
        )}

        {!hasPendingVisits && (
          <ProgressText style={{ opacity: 0.6 }}>
            Não há visitas pendentes para esta data.
          </ProgressText>
        )}
      </GroupHeader>
      
      <VisitsList>
        {children}
      </VisitsList>
    </GroupContainer>
  );
};