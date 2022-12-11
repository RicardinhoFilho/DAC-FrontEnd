import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@components/auth/services/user.service';
import { User } from './../../../shared/models/user.model';

@Component({
  selector: 'app-admin-adicionar-gerente',
  templateUrl: './admin-adicionar-gerente.component.html',
  styleUrls: ['./admin-adicionar-gerente.component.scss'],
})
export class AdminAdicionarGerenteComponent implements OnInit {
  @ViewChild('formGerente') formGerente!: NgForm;
  gerente!: User;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.gerente = new User();
  }

  inserir(): void {
    if (this.formGerente.form.valid) {
      this.userService.inserir(this.gerente).subscribe(() => {
        this.router.navigate(['/admin/listar-gerente']);
      });
    }
  }
}
