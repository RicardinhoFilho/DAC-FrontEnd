export class Transacao {
    constructor (
        public id?: number,
        public idCliente?: number,
        public tipoTransacao?: number,   //TODO, fazer tipo enum, 1 deposito, 2 saque, 3 transferencia
        public valorTransacao?: number,
        public destinatario?: string,
        public saldo?: number,
        public data?: number
    ) {

    }
}
