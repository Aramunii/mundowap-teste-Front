import { Visit } from '../types/visit';

export const MAX_MINUTES_PER_DAY = 8 * 60; 
export const MINUTES_PER_FORM = 15; 
export const MINUTES_PER_PRODUCT = 5;

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
 * Verifica se é possível adicionar uma nova visita em uma data
 * @param visits - Lista de visitas existentes
 * @param date - Data no formato YYYY-MM-DD
 * @param quantidadeFormularios - Quantidade de formulários da nova visita
 * @param quantidadeProdutos - Quantidade de produtos da nova visita
 * @param excludeVisitId - ID da visita a excluir do cálculo (usado na edição)
 * @returns true se houver tempo disponível, false caso contrário
 */
export const canAddVisit = (
  visits: Visit[],
  date: string,
  quantidadeFormularios: number,
  quantidadeProdutos: number,
  excludeVisitId?: string
): { canAdd: boolean; availableMinutes: number; requiredMinutes: number } => {
  // Filtra visitas da data, excluindo a visita que está sendo editada
  const visitsOfDate = visits.filter(
    v => getDateOnly(v.data) === date && v.id !== excludeVisitId
  );
  
  // Calcula minutos já ocupados
  const currentMinutes = getTotalMinutesByDate(visitsOfDate, date);
  
  // Calcula minutos necessários para a nova visita
  const newVisitMinutes = calculateVisitDuration(quantidadeFormularios, quantidadeProdutos);
  
  // Verifica se cabe
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