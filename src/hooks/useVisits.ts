import { useState, useEffect } from 'react';
import { Visit } from '../types/visit';
import { saveVisitsToStorage, loadVisitsFromStorage } from '../utils/localStorage';

export const useVisits = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega visitas do localStorage na inicialização
  useEffect(() => {
    const loadedVisits = loadVisitsFromStorage();
    setVisits(loadedVisits);
    setIsLoading(false);
  }, []);

  // Salva visitas no localStorage sempre que a lista mudar
  useEffect(() => {
    if (!isLoading) {
      saveVisitsToStorage(visits);
    }
  }, [visits, isLoading]);

  const addVisit = (visit: Omit<Visit, 'id'>) => {
    const newVisit: Visit = {
      ...visit,
      id: Date.now().toString()
    };
    setVisits(prev => [...prev, newVisit]);
    return newVisit;
  };

  const updateVisit = (id: string, visitData: Omit<Visit, 'id'>) => {
    setVisits(prev =>
      prev.map(v =>
        v.id === id
          ? { ...visitData, id, status: v.status }
          : v
      )
    );
  };

  const deleteVisit = (id: string) => {
    setVisits(prev => prev.filter(v => v.id !== id));
  };

  const completeVisit = (id: string) => {
    setVisits(prev =>
      prev.map(v =>
        v.id === id
          ? { ...v, status: 'concluido' as const }
          : v
      )
    );
  };

  const replaceAllVisits = (newVisits: Visit[]) => {
    setVisits(newVisits);
  };

  return {
    visits,
    isLoading,
    addVisit,
    updateVisit,
    deleteVisit,
    completeVisit,
    replaceAllVisits
  };
};