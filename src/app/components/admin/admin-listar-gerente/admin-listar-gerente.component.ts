import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from '@components/auth/services/user.service';
import { ClienteService } from '@components/cliente/services';
import { Conta } from '@shared/models/conta.model';
import { lastValueFrom, map } from 'rxjs';
import { User } from './../../../shared/models/user.model';

interface AdminGerentesTable {
  user: User;
}
@Component({
  selector: 'app-admin-listar-gerente',
  templateUrl: './admin-listar-gerente.component.html',
  styleUrls: ['./admin-listar-gerente.component.scss'],
})
export class AdminListarGerenteComponent implements OnInit {
  adminGerentesTable: AdminGerentesTable[] = [];

  displayedColumns = [
    'id',
    'nomeGerente',
    'email',
    'cpf',
    'telefone',
    'actions',
  ];
  dataSource!: MatTableDataSource<AdminGerentesTable>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private clienteService: ClienteService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.userService.getGerentes().subscribe(async (users: User[]) => {
      await Promise.all(
        users.map(async (user: User): Promise<void> => {
          this.adminGerentesTable.push({
            user: user,
          });
        })
      );

      this.dataSource = new MatTableDataSource(this.adminGerentesTable);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (
        item: AdminGerentesTable,
        property: string
      ) => {
        switch (property) {
          case 'id':
            return item.user.id;
          case 'nomeGerente':
            return item.user.nome;
          case 'email':
            return item.user.email;
          case 'cpf':
            return item.user.cpf;
          case 'telefone':
            return item.user.telefone;
          default:
            return (item as any)[property];
        }
      };
      const sortState: Sort = { active: 'nomeGerente', direction: 'asc' };
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
    });
  }

  async getGerenteComMenosContas(id: number): Promise<User> {
    let gerenteOutput!: User;
    let clientesCount: number = +Infinity;
    const gerentes: User[] = await lastValueFrom(
      this.userService.getGerentes()
    );
    await Promise.all(
      gerentes.map(async (gerente: User): Promise<void> => {
        await lastValueFrom(
          this.clienteService.getClientesByGerente(gerente.id!).pipe(
            map((clientes: Conta[]) => {
              if (clientesCount > clientes.length && gerente.id !== id) {
                gerenteOutput = gerente;
                clientesCount = clientes.length;
              }
            })
          )
        );
      })
    );
    return gerenteOutput;
  }

  remover(id: number): void {
    if (confirm('Deseja realmente remover este gerente?')) {
      this.getGerenteComMenosContas(id).then((gerente) => {
        this.clienteService
          .getClientesByGerente(id!)
          .subscribe(async (clientes) => {
            await Promise.all(
              clientes.map(async (cliente: Conta): Promise<void> => {
                cliente.idGerente = gerente.id;
                await lastValueFrom(
                  this.clienteService.atualizarContaCliente(cliente)
                );
              })
            );

            this.userService.remover(id).subscribe(() => {
              const currentUrl = this.router.url;
              this.router
                .navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                  this.router.navigate([currentUrl]);
                });
            });
          });
      });
    }
  }
}
