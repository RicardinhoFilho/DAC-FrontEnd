import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@components/auth/services/user.service';
import { User } from './../../../shared/models/user.model';

@Component({
  selector: 'app-admin-editar-gerente',
  templateUrl: './admin-editar-gerente.component.html',
  styleUrls: ['./admin-editar-gerente.component.scss'],
})
export class AdminEditarGerenteComponent implements OnInit {
  @ViewChild('formGerente') formGerente!: NgForm;
  gerente!: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.userService.getUserById(id).subscribe((user: User) => {
      this.gerente = user;
    });
  }

  atualizar(): void {
    if (this.formGerente.form.valid) {
      this.userService.atualizarUser(this.gerente).subscribe(() => {
        this.router.navigate(['/admin/listar-gerente']);
      });
    }
  }
}
