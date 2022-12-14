export class Conta {
  constructor(
    public id?: number,
    public idUsuario?: number,
    public data?: Date,
    public limite?: number,
    public ativo?: boolean,
    public rejeitadoMotivo?: string,
    public rejeitadoData?: Date,
    public saldo?: number,
    public idGerente?: number,
    public salario?: number
  ) {}
}
