import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-home',
  templateUrl: './cliente-home.component.html',
  styleUrls: ['./cliente-home.component.scss']
})
export class ClienteHomeComponent implements OnInit {

  saldo: number = 0;
  limite: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.saldo = Math.floor(Math.random() * 5000.00);
    this.limite = Math.floor(Math.random() * 1000.00);
  }

}
