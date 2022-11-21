import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteHomeComponent } from './components/cliente';
import { AdminHomeComponent } from './components/admin';
import { GerenteHomeComponent } from './components/gerente/gerente-home';
import { GerenteMelhoresClientesComponent } from './components/gerente/gerente-melhores-clientes';
import { GerenteClientesComponent } from './components/gerente/gerente-clientes';
import { GerentePesquisaComponent } from './components/gerente/gerente-pesquisa';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cliente/home', component: ClienteHomeComponent },
  { path: 'admin/home', component: AdminHomeComponent },
   { path: 'gerente/home', component: GerenteHomeComponent },
   { path: 'gerente/melhores-clientes', component: GerenteMelhoresClientesComponent },
   { path: 'gerente/clientes', component: GerenteClientesComponent },
   { path: 'gerente/pesquisa', component: GerentePesquisaComponent },
   
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
