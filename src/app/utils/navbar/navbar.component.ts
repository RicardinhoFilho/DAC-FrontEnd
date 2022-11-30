import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../components/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  get cargo(): string | undefined {
    return this.authService.usuarioLogado?.cargo;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
