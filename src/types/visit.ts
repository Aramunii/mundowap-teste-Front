export interface Visit {
    id: string;
    data: string; //ISO date string;
    status: 'pendente' | 'concluido';
    quantidadeFormularios: number;
    quantidadeProdutos: number;
    endereco : {
        cep: string;
        uf: string;
        cidade: string;
        logradouro: string;
        bairro: string;
        numero: string;
        complemento: string;
    }
}