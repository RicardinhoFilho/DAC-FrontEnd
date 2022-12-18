import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from '@components/cliente/services/cliente.service';
import { lastValueFrom, map } from 'rxjs';
import { Conta } from './../../../shared/models/conta.model';
import { User } from './../../../shared/models/user.model';
import { UserService } from './../../auth/services/user.service';

interface AdminHomeTable {
  gerente: User;
  clientesCount: number;
  negativos: string;
  positivos: string;
}

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  adminHomeTable: AdminHomeTable[] = [];

  displayedColumns = [
    'id',
    'nome',
    'cpf',
    'email',
    'phone',
    'clientesCount',
    'negativos',
    'positivos',
  ];
  dataSource!: MatTableDataSource<AdminHomeTable>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.userService.getGerentes().subscribe(async (gerentes: User[]) => {
      await Promise.all(
        gerentes.map(async (gerente: User): Promise<void> => {
          await lastValueFrom(
            this.clienteService.getClientesByGerente(gerente.id!).pipe(
              map((clientes: Conta[]) => {
                const negativos: number = clientes.reduce(
                  (accumulator, currentValue) =>
                    accumulator +
                    (currentValue.saldo! < 0 ? currentValue.saldo! : 0),
                  0
                );
                const positivos: number = clientes.reduce(
                  (accumulator, currentValue) =>
                    accumulator +
                    (currentValue.saldo! > 0 ? currentValue.saldo! : 0),
                  0
                );

                this.adminHomeTable.push({
                  gerente: gerente,
                  clientesCount: clientes.length,
                  negativos: negativos.toFixed(2),
                  positivos: positivos.toFixed(2),
                });
              })
            )
          );
        })
      );
      this.dataSource = new MatTableDataSource(this.adminHomeTable);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (
        item: AdminHomeTable,
        property: string
      ) => {
        switch (property) {
          case 'id':
            return item.gerente.id;
          case 'nome':
            return item.gerente.nome;
          case 'cpf':
            return item.gerente.cpf;
          case 'email':
            return item.gerente.email;
          case 'phone':
            return item.gerente.telefone;
          default:
            return (item as any)[property];
        }
      };
    });
  }
}
