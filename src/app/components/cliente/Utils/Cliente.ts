export interface Cliente {
    id: number;
    cpf: string;
    nome: string;
    salario: number;
    saldo: number;
    limite: number;
    ativo: boolean;
  }