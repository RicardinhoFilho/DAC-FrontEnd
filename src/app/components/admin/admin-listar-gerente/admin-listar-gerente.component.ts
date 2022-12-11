import { Component, OnInit } from '@angular/core';
import { UserService } from '@components/auth/services/user.service';
import { User } from './../../../shared/models/user.model';

@Component({
  selector: 'app-admin-listar-gerente',
  templateUrl: './admin-listar-gerente.component.html',
  styleUrls: ['./admin-listar-gerente.component.scss'],
})
export class AdminListarGerenteComponent implements OnInit {
  gerentes: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.listarTodos();
  }

  private listarTodos(): void {
    this.userService.getGerentes().subscribe((users: User[]) => {
      this.gerentes = users;
    });
  }

  remover($event: any, gerente: User): void {
    $event.preventDefault();
    if (confirm(`Remover ${gerente.nome}?`)) {
      this.userService.remover(gerente.id!).subscribe(() => {
        this.listarTodos();
      });
    }
  }
}
