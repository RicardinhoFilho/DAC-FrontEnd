import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  menuCliente: boolean = false;
  menuAdmin: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  menu(usuario: string) {
    switch (usuario) {
      case 'cliente':
        this.menuCliente = true;
        break;
      case 'admin':
        this.menuAdmin = true;
        break;
      default:
        this.menuCliente = false;
        this.menuAdmin = false;
        break;
    }
  }

}
