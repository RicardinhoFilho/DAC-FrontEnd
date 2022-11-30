import { Component, OnInit } from '@angular/core';
import { Conta } from '@shared/models/conta.model';
import { Observable } from 'rxjs';
import { ClienteService } from '../services';

@Component({
  selector: 'app-cliente-home',
  templateUrl: './cliente-home.component.html',
  styleUrls: ['./cliente-home.component.scss'],
})
export class ClienteHomeComponent implements OnInit {
  cliente$: Observable<Conta[]> = new Observable<Conta[]>();
  cliente: Conta = new Conta();

  constructor(private clienteService: ClienteService) {
    //TODO, procurar cliente ta hardcode, quando tiver o login trocar
    this.cliente$ = this.clienteService.buscarSaldoPorId(123);
    this.cliente$.subscribe((cliente: Conta[]) => {
      this.cliente = cliente[0];
    });
  }

  ngOnInit(): void {}
}
