import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '@components/auth/services/user.service';
import { ClienteService } from '@components/cliente/services';
import { Conta } from '@shared/models/conta.model';
import { User } from '@shared/models/user.model';
import { lastValueFrom } from 'rxjs';
interface AdminRelatorioTable {
  user: User;
  gerente: User;
  conta: Conta;
}
@Component({
  selector: 'app-admin-relatorio',
  templateUrl: './admin-relatorio.component.html',
  styleUrls: ['./admin-relatorio.component.scss'],
})
export class AdminRelatorioComponent implements OnInit {
  adminRelatorioTable: AdminRelatorioTable[] = [];

  displayedColumns = [
    'id',
    'nomeCliente',
    'cpf',
    'saldo',
    'limite',
    'nomeGerente',
  ];
  dataSource!: MatTableDataSource<AdminRelatorioTable>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private clienteService: ClienteService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userService.getClientes().subscribe(async (users: User[]) => {
      await Promise.all(
        users.map(async (user: User): Promise<void> => {
          const contas = await lastValueFrom(
            this.clienteService.buscarContaPorUserId(user.id!)
          );

          const gerente = await lastValueFrom(
            this.userService.getUserById(contas[0].idGerente!)
          );

          this.adminRelatorioTable.push({
            user: user,
            gerente: gerente,
            conta: contas[0],
          });
        })
      );

      this.dataSource = new MatTableDataSource(this.adminRelatorioTable);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (
        item: AdminRelatorioTable,
        property: string
      ) => {
        switch (property) {
          case 'id':
            return item.user.id;
          case 'nomeCliente':
            return item.user.nome;
          case 'cpf':
            return item.user.cpf;
          case 'limite':
            return item.conta.limite;
          case 'nomeGerente':
            return item.gerente.nome;
          case 'saldo':
            return item.conta.saldo;
          default:
            return (item as any)[property];
        }
      };
      const sortState: Sort = { active: 'nomeCliente', direction: 'asc' };
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
    });
  }
}
