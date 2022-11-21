import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteHomeComponent } from './components/cliente';
import { AdminHomeComponent } from './components/admin';
import { GerenteHomeComponent } from './components/gerente/gerente-home';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cliente/home', component: ClienteHomeComponent },
  { path: 'admin/home', component: AdminHomeComponent },
   { path: 'gerente/home', component: GerenteHomeComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
