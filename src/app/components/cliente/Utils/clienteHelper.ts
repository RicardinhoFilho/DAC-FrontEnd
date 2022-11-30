import { Transacao } from '@shared/models';
import { Conta } from '@shared/models/conta.model';

export default class clienteHelper {
  static formatarTransacao(
    id: number,
    cliente: Conta,
    valorDeposito: number,
    tipoTransacao: number,
    destinatario?: any
  ) {
    let transacao: Transacao = new Transacao();

    transacao.id = id;
    transacao.idCliente = cliente.id;
    transacao.tipoTransacao = tipoTransacao; //TODO, fazer tipo enum, 1 deposito, 2 saque, 3 transferencia
    transacao.valorTransacao = valorDeposito;
    transacao.saldo =
      tipoTransacao == 1
        ? cliente.saldo! + valorDeposito
        : cliente.saldo! - valorDeposito;
    transacao.destinatario = tipoTransacao == 3 ? destinatario : null;
    transacao.data = new Date().valueOf();

    return transacao;
  }

  static formatarAlterarSaldoCliente(
    cliente: Conta,
    valorDeposito: number,
    tipoTransacao: number
  ) {
    let clienteAlterar: Conta = new Conta();
    //   clienteAlterar.id = cliente.id;
    //   clienteAlterar.cpf = cliente.cpf;
    //   clienteAlterar.ativo = cliente.ativo;
    //   clienteAlterar.limite = cliente.limite;
    //   clienteAlterar.nome = cliente.nome;
    //   clienteAlterar.salario = cliente.salario;
    //   clienteAlterar.saldo =
    //     tipoTransacao == 1
    //       ? cliente.saldo + valorDeposito
    //       : cliente.saldo - valorDeposito;
    return clienteAlterar;
  }
}
