import { Component, OnInit } from '@angular/core';
import { GerenteService } from '@components/gerente/services/gerente.service';
import { User } from './../../../shared/models/user.model';

@Component({
  selector: 'app-admin-listar-gerente',
  templateUrl: './admin-listar-gerente.component.html',
  styleUrls: ['./admin-listar-gerente.component.scss'],
})
export class AdminListarGerenteComponent implements OnInit {
  gerentes: User[] = [];

  constructor(private gerenteService: GerenteService) {}

  ngOnInit(): void {
    this.gerentes = this.listarTodos();
  }

  listarTodos(): User[] {
    return this.gerenteService.listarTodos();
  }

  remover($event: any, gerente: User): void {
    $event.preventDefault();
    if (confirm(`Remover ${gerente.nome}?`)) {
      this.gerenteService.remover(gerente.id!);
      this.gerentes = this.listarTodos();
    }
  }
}
