import { Injectable } from '@angular/core';
import { User } from './../../../shared/models/user.model';

const LS_CHAVE: string = 'gerentes';

@Injectable({
  providedIn: 'root',
})
export class GerenteService {
  constructor() {}

  listarTodos(): User[] {
    const gerentes = localStorage[LS_CHAVE];
    return gerentes ? JSON.parse(gerentes) : [];
  }

  inserir(gerente: User): void {
    const gerentes = this.listarTodos();
    gerente.id = new Date().getTime();
    gerentes.push(gerente);
    localStorage[LS_CHAVE] = JSON.stringify(gerentes);
  }

  buscarPorID(id: number): User | undefined {
    const gerentes: User[] = this.listarTodos();

    return gerentes.find((gerente) => gerente.id === id);
  }

  atualizar(gerente: User): void {
    const gerentes: User[] = this.listarTodos();

    gerentes.forEach((obj, index, objs) => {
      if (gerente.id === obj.id) {
        objs[index] = gerente;
      }
    });
    localStorage[LS_CHAVE] = JSON.stringify(gerentes);
  }

  remover(id: number): void {
    let gerentes: User[] = this.listarTodos();

    gerentes = gerentes.filter((gerente) => gerente.id !== id);
    localStorage[LS_CHAVE] = JSON.stringify(gerentes);
  }
}
