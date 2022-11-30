import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from '@shared/models/login.model';
import { User } from './../../../shared/models/user.model';
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
      await this.authService
        .login(this.login)
        .then((usuario: User | undefined) => {
          if (usuario) {
            this.authService.usuarioLogado = usuario;
            this.router.navigate([
              '/' + this.authService.usuarioLogado.cargo + '/home',
            ]);
          } else {
            this.message = 'Usuário/Senha inválidos.';
          }
        });
    }
    this.loading = false;
  }
}
