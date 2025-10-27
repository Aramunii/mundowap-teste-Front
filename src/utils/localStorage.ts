import { Visit } from '../types/visit';

const VISITS_STORAGE_KEY = 'mundowap_visits';

/**
 * Salva as visitas no localStorage
 */
export const saveVisitsToStorage = (visits: Visit[]): void => {
  try {
    const serialized = JSON.stringify(visits);
    localStorage.setItem(VISITS_STORAGE_KEY, serialized);
  } catch (error) {
    console.error('Erro ao salvar visitas no localStorage:', error);
  }
};

/**
 * Carrega as visitas do localStorage
 */
export const loadVisitsFromStorage = (): Visit[] => {
  try {
    const serialized = localStorage.getItem(VISITS_STORAGE_KEY);
    
    if (serialized === null) {
      return getDefaultVisits();
    }
    
    const visits = JSON.parse(serialized) as Visit[];
    
    // Valida se há dados válidos
    if (!Array.isArray(visits) || visits.length === 0) {
      return getDefaultVisits();
    }
    
    return visits;
  } catch (error) {
    console.error('Erro ao carregar visitas do localStorage:', error);
    return getDefaultVisits();
  }
};

/**
 * Limpa todas as visitas do localStorage
 */
export const clearVisitsFromStorage = (): void => {
  try {
    localStorage.removeItem(VISITS_STORAGE_KEY);
  } catch (error) {
    console.error('Erro ao limpar visitas do localStorage:', error);
  }
};

/**
 * Verifica se há dados salvos no localStorage
 */
export const hasStoredVisits = (): boolean => {
  try {
    const serialized = localStorage.getItem(VISITS_STORAGE_KEY);
    return serialized !== null;
  } catch (error) {
    return false;
  }
};

/**
 * Retorna visitas padrão (dados de exemplo)
 */
const getDefaultVisits = (): Visit[] => {
  return [
    {
      id: '1',
      data: new Date().toISOString(),
      status: 'pendente',
      quantidadeFormularios: 3,
      quantidadeProdutos: 5,
      endereco: {
        cep: '01310-100',
        uf: 'SP',
        cidade: 'São Paulo',
        logradouro: 'Avenida Paulista',
        bairro: 'Bela Vista',
        numero: '1578',
        complemento: ''
      }
    },
    {
      id: '2',
      data: new Date().toISOString(),
      status: 'concluido',
      quantidadeFormularios: 2,
      quantidadeProdutos: 3,
      endereco: {
        cep: '01310-200',
        uf: 'SP',
        cidade: 'São Paulo',
        logradouro: 'Rua Augusta',
        bairro: 'Consolação',
        numero: '2000',
        complemento: 'Apto 101'
      }
    },
    {
      id: '3',
      data: new Date().toISOString(),
      status: 'pendente',
      quantidadeFormularios: 1,
      quantidadeProdutos: 2,
      endereco: {
        cep: '01310-300',
        uf: 'SP',
        cidade: 'São Paulo',
        logradouro: 'Rua da Consolação',
        bairro: 'Consolação',
        numero: '100',
        complemento: ''
      }
    }
  ];
};

/**
 * Exporta todas as visitas em formato JSON para download
 */
export const exportVisitsToJSON = (visits: Visit[]): void => {
  try {
    const dataStr = JSON.stringify(visits, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `visitas_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Erro ao exportar visitas:', error);
  }
};

/**
 * Importa visitas de um arquivo JSON
 */
export const importVisitsFromJSON = (file: File): Promise<Visit[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const visits = JSON.parse(content) as Visit[];
        
        if (!Array.isArray(visits)) {
          throw new Error('Formato de arquivo inválido');
        }
        
        resolve(visits);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Erro ao ler arquivo'));
    };
    
    reader.readAsText(file);
  });
};