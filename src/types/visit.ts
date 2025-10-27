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

// Interface para os dados do formulário (usado no React Hook Form)
export interface VisitFormData {
  data: string;
  quantidadeFormularios: string; // string porque vem do input
  quantidadeProdutos: string;
  cep: string;
  uf: string;
  cidade: string;
  logradouro: string;
  bairro: string;
  numero: string;
  complemento: string;
}