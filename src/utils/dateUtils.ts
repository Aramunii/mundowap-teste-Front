import { Visit } from '../types/visit';

export const MAX_MINUTES_PER_DAY = 8 * 60; // 8 horas = 480 minutos
export const MINUTES_PER_FORM = 15; // Cada formulário = 15 minutos
export const MINUTES_PER_PRODUCT = 5; // Cada produto = 5 minutos

/**
 * Calcula a duração total de uma visita em minutos
 */
export const calculateVisitDuration = (
  quantidadeFormularios: number,
  quantidadeProdutos: number
): number => {
  return (quantidadeFormularios * MINUTES_PER_FORM) + (quantidadeProdutos * MINUTES_PER_PRODUCT);
};

/**
 * Extrai apenas a data (YYYY-MM-DD) de uma string ISO
 */
export const getDateOnly = (dateString: string): string => {
  return dateString.split('T')[0];
};

/**
 * Calcula o total de minutos agendados para uma data específica
 */
export const getTotalMinutesByDate = (visits: Visit[], date: string): number => {
  return visits
    .filter(visit => getDateOnly(visit.data) === date)
    .reduce((total, visit) => {
      return total + calculateVisitDuration(visit.quantidadeFormularios, visit.quantidadeProdutos);
    }, 0);
};

/**
 * Calcula o total de minutos concluídos para uma data específica
 */
export const getCompletedMinutesByDate = (visits: Visit[], date: string): number => {
  return visits
    .filter(visit => getDateOnly(visit.data) === date && visit.status === 'concluido')
    .reduce((total, visit) => {
      return total + calculateVisitDuration(visit.quantidadeFormularios, visit.quantidadeProdutos);
    }, 0);
};

/**
 * Verifica se é possível adicionar uma nova visita em uma data
 */
export const canAddVisit = (
  visits: Visit[],
  date: string,
  quantidadeFormularios: number,
  quantidadeProdutos: number,
  excludeVisitId?: string
): { canAdd: boolean; availableMinutes: number; requiredMinutes: number } => {
  const visitsOfDate = visits.filter(
    v => getDateOnly(v.data) === date && v.id !== excludeVisitId
  );
  
  const currentMinutes = getTotalMinutesByDate(visitsOfDate, date);
  const newVisitMinutes = calculateVisitDuration(quantidadeFormularios, quantidadeProdutos);
  const totalMinutes = currentMinutes + newVisitMinutes;
  const canAdd = totalMinutes <= MAX_MINUTES_PER_DAY;
  
  return {
    canAdd,
    availableMinutes: MAX_MINUTES_PER_DAY - currentMinutes,
    requiredMinutes: newVisitMinutes
  };
};

/**
 * Formata minutos para horas e minutos (ex: 90 -> "1h 30min")
 */
export const formatMinutes = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins}min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
};

/**
 * Formata data no formato "Ter. 28/08/2023"
 */
export const formatDateHeader = (dateString: string): string => {
  const date = new Date(dateString + 'T00:00:00');
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const dayName = days[date.getDay()];
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return `${dayName}. ${day}/${month}/${year}`;
};

/**
 * Agrupa visitas por data
 */
export const groupVisitsByDate = (visits: Visit[]): Map<string, Visit[]> => {
  const grouped = new Map<string, Visit[]>();
  
  visits.forEach(visit => {
    const date = getDateOnly(visit.data);
    if (!grouped.has(date)) {
      grouped.set(date, []);
    }
    grouped.get(date)!.push(visit);
  });
  
  // Ordena as datas
  const sortedMap = new Map(Array.from(grouped.entries()).sort((a, b) => a[0].localeCompare(b[0])));
  
  return sortedMap;
};

/**
 * Calcula percentual de minutos agendados em relação ao máximo
 */
export const getScheduledPercentage = (visits: Visit[], date: string): number => {
  const totalMinutes = getTotalMinutesByDate(visits, date);
  return Math.round((totalMinutes / MAX_MINUTES_PER_DAY) * 100);
};

/**
 * Calcula percentual de minutos concluídos em relação ao total agendado
 */
export const getCompletedPercentage = (visits: Visit[], date: string): number => {
  const totalMinutes = getTotalMinutesByDate(visits, date);
  const completedMinutes = getCompletedMinutesByDate(visits, date);
  
  if (totalMinutes === 0) return 0;
  
  return Math.round((completedMinutes / totalMinutes) * 100);
};

/**
 * Retorna a cor baseada no percentual de conclusão
 */
export const getCompletionColor = (percentage: number): string => {
  if (percentage < 60) return '#e74c3c'; // Vermelho
  if (percentage > 90) return '#27ae60'; // Verde
  return '#3498db'; // Azul
};

/**
 * Adiciona dias a uma data
 */
export const addDays = (dateString: string, days: number): string => {
  const date = new Date(dateString + 'T00:00:00');
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};

/**
 * Move visitas pendentes para os próximos dias disponíveis
 */
export const closeDateAndRelocateVisits = (visits: Visit[], dateToClose: string): Visit[] => {
  // Separa visitas da data a ser fechada
  const visitsToRelocate = visits.filter(
    v => getDateOnly(v.data) === dateToClose && v.status === 'pendente'
  );
  
  // Visitas de outras datas ou já concluídas
  const otherVisits = visits.filter(
    v => getDateOnly(v.data) !== dateToClose || v.status === 'concluido'
  );
  
  if (visitsToRelocate.length === 0) {
    return visits; // Nada para realocar
  }
  
  const relocatedVisits: Visit[] = [];
  let currentDate = addDays(dateToClose, 1);
  
  for (const visit of visitsToRelocate) {
    const visitDuration = calculateVisitDuration(
      visit.quantidadeFormularios,
      visit.quantidadeProdutos
    );
    
    // Verifica se cabe na data atual
    let canFit = false;
    while (!canFit) {
      const existingMinutes = getTotalMinutesByDate(
        [...otherVisits, ...relocatedVisits],
        currentDate
      );
      
      if (existingMinutes + visitDuration <= MAX_MINUTES_PER_DAY) {
        canFit = true;
      } else {
        currentDate = addDays(currentDate, 1);
      }
    }
    
    // Cria visita realocada
    const relocatedVisit: Visit = {
      ...visit,
      data: new Date(currentDate + 'T00:00:00').toISOString()
    };
    
    relocatedVisits.push(relocatedVisit);
  }
  
  return [...otherVisits, ...relocatedVisits];
};