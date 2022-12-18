import { Component, OnInit } from '@angular/core';
import { UserService } from '@components/auth/services/user.service';
import { ClienteService } from '@components/cliente/services';
import { Conta } from '@shared/models/conta.model';
import { User } from '@shared/models/user.model';
import { map } from 'rxjs';


@Component({
  selector: 'app-admin-relatorio',
  templateUrl: './admin-relatorio.component.html',
  styleUrls: ['./admin-relatorio.component.scss']
})
export class AdminRelatorioComponent implements OnInit {
  clientes: User[]=[];
  contas: Conta[]=[];
  gerentes: User[]=[];

  constructor(private userService: UserService,
    private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clientes = this.listarClientes();
  }

  listarClientes(): User[]{
    this.userService.getClientes().subscribe({
      next: (data: User[]) => {
        this.clientes = data;
        this.clientes.forEach((cliente, i) => {
          this.clienteService
              .getAll().pipe(map(conta => conta.filter(conta => conta.idUsuario = cliente.id)))
              .subscribe((contas: Conta[]) => {
                this.contas = contas;
              });
          this.userService
            .getGerentes().pipe(map(gerente => gerente.filter(gerente => gerente.id = this.contas[i].idGerente)))
            .subscribe((gerentes: User[]) => {
              this.gerentes = gerentes;
          });
        });
        
      }
    });
    return this.clientes;
  }
}
