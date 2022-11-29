import { Component, OnInit } from '@angular/core';
import { ClienteModel } from '@shared/models';
import { Observable } from 'rxjs';
import { ClienteService } from '../services';
import { Cliente } from '../Utils/Cliente';

@Component({
  selector: 'app-cliente-home',
  templateUrl: './cliente-home.component.html',
  styleUrls: ['./cliente-home.component.scss']
})
export class ClienteHomeComponent implements OnInit {

  cliente$: Observable<Cliente[]> = new Observable<Cliente[]>();
  cliente: ClienteModel = new ClienteModel();

  constructor(
    private clienteService: ClienteService,
  ) { 
    //TODO, procurar cliente ta hardcode, quando tiver o login trocar
    this.cliente$ = this.clienteService.buscarSaldoPorId(123);
    this.cliente$.subscribe(cliente => {
      this.cliente = cliente[0];
    })
  }

  ngOnInit(): void {
  }

}
