import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@components/auth/services/auth.service';
import { UserService } from '@components/auth/services/user.service';
import { Transacao } from '@shared/models';
import { Conta } from '@shared/models/conta.model';
import { User } from '@shared/models/user.model';
import { Observable } from 'rxjs';
import { ClienteService } from '../services';

@Component({
  selector: 'app-cliente-extrato',
  templateUrl: './cliente-extrato.component.html',
  styleUrls: ['./cliente-extrato.component.scss'],
})
export class ClienteExtratoComponent implements OnInit {
  transacaos$: Observable<Transacao[]> = new Observable<Transacao[]>();
  allTransacao: Transacao[] = [];
  transacaos: Transacao[] = [];

  formExtrato: FormGroup;
  dateInicio = new FormControl(new Date());
  dateFinal = new FormControl(new Date());
  telaExtrato: boolean = false;

  displayedColumns: string[] = [
    'dataHora',
    'operacao',
    'cliente',
    'valor',
    'saldo',
  ];

  mensagem = "";
  cliente!: Conta;
  contaCliente$: Observable<Conta> = new Observable<Conta>();
  contaCliente : Conta = new Conta();
  contas: Conta[] = [];
  usuarios: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private authService: AuthService,
    private userService: UserService,
  ) {
    this.formExtrato = this.formBuilder.group({
      dataInicio: new FormControl('', Validators.required),
      dateFinal: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.transacaos$ = this.clienteService.getAllTransacaos();
    this.transacaos$.subscribe((item) => {
      this.allTransacao = item;
    });

    this.cliente = this.authService.contaCliente;

    this.contaCliente$ = this.clienteService.buscarContaPorId(this.cliente.id!);
    this.contaCliente$.subscribe(cliente => {
      this.contaCliente = cliente;
    });

    this.clienteService.getAll().subscribe(contas => {
      this.contas = contas;
    });
    this.userService.getAllUsers().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  trocarTela(dataInicio?: any, dataFinal?: any) {
    this.telaExtrato = !this.telaExtrato;
    this.transacaos = [];

    if(dataInicio.value == null || dataFinal.value == null) {
      this.mensagem = `A data início e/ou data final não podem estar vazios!!!`;
      this.telaExtrato = false;
    } else {
      this.mensagem = "";
      this.allTransacao.forEach((item) => {
        if (
          dataInicio.value.valueOf() <= item.data! &&
          dataFinal.value.valueOf() >= item.data! &&
          (item.idCliente == this.contaCliente.id ||
            +item.destinatario! == this.contaCliente.id)
        ) {
          this.transacaos.push(item);
        }
      });
    }
  }

  nomeDestinatario(id: number): string | undefined {
    let conta = this.contas.find(conta => conta.id == id);
    if(conta) {
      let usuario = this.usuarios.find(usuario => usuario.id == conta?.id)
        if(usuario)
          return usuario.nome;
    }
    return "";
  }

  get usuarioLogado(): User {
    return this.authService.usuarioLogado;
  }
}
