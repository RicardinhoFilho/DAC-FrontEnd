export class ClienteModel {
    constructor (
        public id?: number,
        public cpf?: string,
        public nome?: string,
        public salario?: number,
        public saldo?: number,
        public limite?: number,
        public ativo?: boolean
    ) {

    }
}