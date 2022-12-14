import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@components/auth/services/auth.service';
import { UserService } from '@components/auth/services/user.service';
import { ClienteService } from '@components/cliente/services/cliente.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '@shared/models/user.model';
import { concatAll, last, lastValueFrom, map, of } from 'rxjs';
import { GerenteModalComponent } from '../gerente-modal/gerente-modal.component';
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
  clientes!: IClienteCompleto[];

  displayedColumns = ['id', 'nome', 'cpf', 'salario', 'actions'];
  dataSource!: MatTableDataSource<IClienteCompleto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private contaService: ClienteService,
    private userService: UserService,
    private authService: AuthService,
    private modalService: NgbModal
  ) {}

  async ngOnInit(): Promise<void> {
    await this.setupTable();
  }

  async setupTable(): Promise<void> {
    this.clientes = [];
    this.contaService
      .getClientesPendenteByGerente(this.authService.usuarioLogado.id!)
      .subscribe(async (contas: Conta[]) => {
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
        const sortState: Sort = { active: 'id', direction: 'desc' };
        this.sort.direction = sortState.direction;
        this.sort.sortChange.emit(sortState);
      });
  }

  generateStrongPassword(): string {
    let password = '';
    const possibleChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const possibleNumbers = '0123456789';
    const possibleSymbols = '!@#$%';
    const possible = possibleChars + possibleNumbers + possibleSymbols;
    for (let i = 0; i < 13; i++) {
      password += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return password;
  }

  acceptUser(cliente: IClienteCompleto) {
    if (confirm('Tem certeza que quer aceitar este cliente?')) {
      const newConta: Conta = Object.assign({}, cliente.conta);
      const newUser: User = Object.assign({}, cliente.cliente);

      newConta.ativo = true;
      newUser.senha = this.generateStrongPassword();

      const task1$ = this.userService.atualizarUser(newUser);
      const task2$ = this.contaService.atualizarContaCliente(newConta);
      const tasks$ = of(task1$, task2$);

      tasks$.pipe(concatAll(), last()).subscribe(() => this.setupTable());
    }
  }

  rejectUser(cliente: IClienteCompleto) {
    const modalRef = this.modalService.open(GerenteModalComponent);
    modalRef.componentInstance.cliente = cliente;
    modalRef.componentInstance.passEntry.subscribe(() => {
      this.setupTable();
    });
  }
}
