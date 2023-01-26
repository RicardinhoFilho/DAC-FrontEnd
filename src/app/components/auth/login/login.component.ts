import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '@components/cliente/services/cliente.service';
import { Conta } from '@shared/models/conta.model';
import { Login } from '@shared/models/login.model';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('formLogin') formLogin!: NgForm;
  login: Login = new Login();
  loading: boolean = false;
  message!: string;

  constructor(
    private authService: AuthService,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.authService.usuarioLogado)
      this.router.navigate([
        '/' + this.authService.usuarioLogado.cargo + '/home',
      ]);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params: any) => (this.message = params['error'])
    );
  }

  async logar(): Promise<void> {
    this.loading = true;
    if (this.formLogin.form.valid) {
      this.authService.login(this.login).subscribe((res: any) => {
        if (res) {
          this.authService.usuarioLogado = res.data;
          if (res.data.cargo == 'cliente') {
            this.clienteService
              .buscarContaPorUserId(res.data.id!)
              .subscribe((contas: Conta[]) => {
                this.authService.contaCliente = contas[0];
                this.router.navigate([
                  '/' + this.authService.usuarioLogado.cargo + '/home',
                ]);
              });
          } else {
            this.router.navigate([
              '/' + this.authService.usuarioLogado.cargo + '/home',
            ]);
          }
        } else {
          this.message = 'Usuário/Senha inválidos.';
        }
      });
    }
    this.loading = false;
  }
}
