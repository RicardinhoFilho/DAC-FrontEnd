import { Transacao } from '@shared/models';
import { Conta } from '@shared/models/conta.model';

export default class clienteHelper {
  static formatarTransacao(
    id: number,
    cliente: Conta[],
    valorDeposito: number,
    tipoTransacao: number,
    destinatario?: any
  ) {
    let transacao: Transacao = new Transacao();

    transacao.id = id;
    transacao.idCliente = cliente[0].id;
    transacao.tipoTransacao = tipoTransacao; //TODO, fazer tipo enum, 1 deposito, 2 saque, 3 transferencia
    transacao.valorTransacao = valorDeposito;
    transacao.saldo =
      tipoTransacao == 1
        ? cliente[0].saldo! + valorDeposito
        : cliente[0].saldo! - valorDeposito;
    transacao.destinatario = tipoTransacao == 3 ? destinatario : null;
    transacao.data = new Date().valueOf();

    return transacao;
  }

  static formatarAlterarSaldoCliente(
    cliente: Conta[],
    valorDeposito: number,
    tipoTransacao: number
  ) {
    let clienteAlterar: Conta = new Conta();
    //   clienteAlterar.id = cliente[0].id;
    //   clienteAlterar.cpf = cliente[0].cpf;
    //   clienteAlterar.ativo = cliente[0].ativo;
    //   clienteAlterar.limite = cliente[0].limite;
    //   clienteAlterar.nome = cliente[0].nome;
    //   clienteAlterar.salario = cliente[0].salario;
    //   clienteAlterar.saldo =
    //     tipoTransacao == 1
    //       ? cliente[0].saldo + valorDeposito
    //       : cliente[0].saldo - valorDeposito;
    return clienteAlterar;
  }
}
