import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GerenteHomeComponent } from "./gerente-home";
import { GerenteMelhoresClientesComponent } from "./gerente-melhores-clientes";
import { GerenteClienteDetalhesComponent} from "./gerente-cliente-detalhes";


const routesGerente: Routes = [
    { path: 'gerente/home', component: GerenteHomeComponent, },
    { path: 'gerente/melhores-clientes', component: GerenteMelhoresClientesComponent },
    { path: 'gerente/cliente/detalhes/:cpf', component: GerenteClienteDetalhesComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routesGerente)],
    exports: [RouterModule]
  })
  export class AppRoutingModuleCliente { }