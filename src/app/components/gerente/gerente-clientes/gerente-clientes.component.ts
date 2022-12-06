import { Component, OnInit } from '@angular/core';
import { ClienteService } from '@components/cliente/services/cliente.service';
import { Conta } from '@shared/models/conta.model';
import { User } from './../../../shared/models/user.model';
interface IClienteCompleto {
  conta: Conta;
  cliente: User;
}
@Component({
  selector: 'app-gerente-clientes',
  templateUrl: './gerente-clientes.component.html',
  styleUrls: ['./gerente-clientes.component.scss'],
})
export class GerenteClientesComponent implements OnInit {
    clientes: IClienteCompleto[] = [];
  
    constructor(private contaservice: ClienteService) {
      this.getContas();
    }
  
    ngOnInit(): void {}
  
    getContas() {
      this.contaservice
        .getClientesByGerente(2)
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
