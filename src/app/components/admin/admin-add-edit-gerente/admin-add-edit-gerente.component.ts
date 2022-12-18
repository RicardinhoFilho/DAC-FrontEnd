import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@components/auth/services/user.service';
import { User } from '@shared/models/user.model';

@Component({
  selector: 'app-admin-add-edit-gerente',
  templateUrl: './admin-add-edit-gerente.component.html',
  styleUrls: ['./admin-add-edit-gerente.component.scss'],
})
export class AdminAddEditGerenteComponent implements OnInit {
  @ViewChild('formGerente') formGerente!: NgForm;
  gerente!: User;
  id!: number;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params?.['id'];
    });

    if (this.id) {
      this.userService.getUserById(this.id).subscribe((gerente) => {
        this.gerente = gerente;
      });
    } else {
      this.gerente = new User();
    }
  }

  inserir(): void {
    if (this.formGerente.form.valid) {
      this.userService.inserir(this.gerente).subscribe(() => {
        this.router.navigate(['/admin/listar-gerente']);
      });
    }
  }

  atualizar(): void {
    if (this.formGerente.form.valid) {
      this.userService.atualizarUser(this.gerente).subscribe(() => {
        this.router.navigate(['/admin/listar-gerente']);
      });
    }
  }

  submit(): void {
    console.log(this.formGerente);
    console.log(this.gerente);
  }
}
