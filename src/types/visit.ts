export interface Visit {
  id: string;
  data: string;
  status: 'pendente' | 'concluido';
  quantidadeFormularios: number;
  quantidadeProdutos: number;
  endereco: {
    cep: string;
    uf: string;
    cidade: string;
    logradouro: string;
    bairro: string;
    numero: string;
    complemento: string;
  };
}


export interface VisitFormData {
  data: string;
  quantidadeFormularios: string; 
  quantidadeProdutos: string;
  cep: string;
  uf: string;
  cidade: string;
  logradouro: string;
  bairro: string;
  numero: string;
  complemento: string;
}