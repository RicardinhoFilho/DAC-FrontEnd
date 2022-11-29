export class Conta {
  constructor(
    public id?: number,
    public idUsuario?: number,
    public data?: Date,
    public limite?: number,
    public ativo?: number,
    public saldo?: number,
    public idGerente?: number,
    public salario?: string
  ) {}
}
