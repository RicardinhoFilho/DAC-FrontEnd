import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GerenteHomeComponent } from "./gerente-home";
import { GerenteMelhoresClientesComponent } from "./gerente-melhores-clientes";


const routesGerente: Routes = [
    { path: 'gerente/home', component: GerenteHomeComponent, },
    { path: 'gerente/melhores-clientes', component: GerenteMelhoresClientesComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routesGerente)],
    exports: [RouterModule]
  })
  export class AppRoutingModuleCliente { }