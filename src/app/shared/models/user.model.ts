export class User {
  constructor(
    public id?: number,
    public nome?: string,
    public email?: string,
    public senha?: string,
    public cargo?: string,
    public cpf?: string,
    public telefone?: string,
    public estado?: number,
    public cidade?: number,
    public cep?: string,
    public rua?: string,
    public numero?: number,
    public complemento?: string
  ) {}
}
