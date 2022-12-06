import { Component, OnInit } from '@angular/core';
import { ClienteService } from '@components/cliente/services/cliente.service';
import { User } from '@shared/models/user.model';
import { Conta } from './../../../shared/models/conta.model';
interface IClienteCompleto {
  conta: Conta;
  cliente: User;
}
@Component({
  selector: 'app-gerente-home',
  templateUrl: './gerente-home.component.html',
  styleUrls: ['./gerente-home.component.scss'],
})
export class GerenteHomeComponent implements OnInit {
  clientes: IClienteCompleto[] = [];

  constructor(private contaservice: ClienteService) {
    this.getContas();
  }

  ngOnInit(): void {}

  getContas() {
    this.contaservice
      .getClientesPendenteByGerente(2)
      .subscribe((contas: Conta[]) =>
        contas.forEach((item) => {
          this.contaservice
            .getClienteById(item.idUsuario)
            .subscribe((user: User[]) => {
              this.clientes.push({ conta: item, cliente: user[0] });
            });
        })
      );
  
  }

  getContasString() {
    return JSON.stringify(this.clientes);
  }
}
