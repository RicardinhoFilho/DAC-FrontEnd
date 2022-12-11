import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@components/auth/services/auth.service';
import { UserService } from '@components/auth/services/user.service';
import { ClienteService } from '@components/cliente/services';
import { Conta } from '@shared/models/conta.model';
import { User } from '@shared/models/user.model';
import { lastValueFrom, map } from 'rxjs';
interface IClienteCompleto {
  conta: Conta;
  cliente: User;
}
@Component({
  selector: 'app-gerente-melhores-clientes',
  templateUrl: './gerente-melhores-clientes.component.html',
  styleUrls: ['./gerente-melhores-clientes.component.scss'],
})
export class GerenteMelhoresClientesComponent implements OnInit {
  clientes: IClienteCompleto[] = [];

  displayedColumns = ['id', 'nome', 'cpf', 'salario'];
  dataSource!: MatTableDataSource<IClienteCompleto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private contaService: ClienteService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.contaService
      .getClientesByGerente(this.authService.usuarioLogado.id!)
      .subscribe(async (contas: Conta[]) => {
        contas = contas
          .sort((a, b) => {
            return a.salario! > b.salario! ? -1 : 1;
          })
          .slice(0, 5);
        await Promise.all(
          contas.map(async (item) => {
            await lastValueFrom(
              this.userService.getUserById(item.idUsuario!).pipe(
                map((user: User) => {
                  this.clientes.push({ conta: item, cliente: user });
                })
              )
            );
          })
        );

        this.dataSource = new MatTableDataSource(this.clientes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (
          item: IClienteCompleto,
          property: string
        ) => {
          switch (property) {
            case 'id':
              return item.cliente.id;
            case 'nome':
              return item.cliente.nome;
            case 'cpf':
              return item.cliente.cpf;
            case 'salario':
              return item.conta.salario;
            default:
              return (item as any)[property];
          }
        };
      });
  }
}
