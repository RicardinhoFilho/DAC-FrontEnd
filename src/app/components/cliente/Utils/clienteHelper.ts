import { ClienteModel, Transacao } from "@shared/models";
import { Cliente } from "./Cliente";

export default class clienteHelper {
    static formatarTransacao(id: number, cliente: Cliente[], valorDeposito: number, tipoTransacao: number, destinatario?: any) {
        let transacao: Transacao = new Transacao();

        transacao.id = id;
        transacao.idCliente = cliente[0].id; 
        transacao.tipoTransacao = tipoTransacao;   //TODO, fazer tipo enum, 1 deposito, 2 saque, 3 transferencia
        transacao.valorTransacao = valorDeposito;
        transacao.saldo = tipoTransacao == 1 ? cliente[0].saldo + valorDeposito : cliente[0].saldo - valorDeposito;
        transacao.destinatario = tipoTransacao == 3 ? destinatario : null;
        transacao.data = new Date().valueOf();

        return transacao;
    }

    static formatarAlterarSaldoCliente(cliente: Cliente[], valorDeposito: number, tipoTransacao: number) {
        let clienteAlterar: ClienteModel = new ClienteModel();
        
        clienteAlterar.id = cliente[0].id;
        clienteAlterar.cpf = cliente[0].cpf;
        clienteAlterar.ativo = cliente[0].ativo;
        clienteAlterar.limite = cliente[0].limite;
        clienteAlterar.nome = cliente[0].nome;
        clienteAlterar.salario = cliente[0].salario;
        clienteAlterar.saldo = tipoTransacao == 1 ? cliente[0].saldo + valorDeposito : cliente[0].saldo - valorDeposito;

        return clienteAlterar;
    }
}