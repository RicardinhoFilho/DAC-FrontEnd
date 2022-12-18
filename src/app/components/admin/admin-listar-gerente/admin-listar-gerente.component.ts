import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '@components/auth/services/user.service';
import { lastValueFrom } from 'rxjs';
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
}
