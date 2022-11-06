import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClienteAlterarComponent } from "./cliente-alterar";
import { ClienteDepositarComponent } from "./cliente-depositar";
import { ClienteExtratoComponent } from "./cliente-extrato";
import { ClienteHomeComponent } from "./cliente-home";
import { ClienteSaqueComponent } from "./cliente-saque";
import { ClienteTransferenciaComponent } from "./cliente-transferencia";

const routesCliente: Routes = [
    { path: 'cliente/home', component: ClienteHomeComponent, },
    { path: 'cliente/alterar', component: ClienteAlterarComponent },
    { path: 'cliente/depositar', component: ClienteDepositarComponent },
    { path: 'cliente/saque', component: ClienteSaqueComponent },
    { path: 'cliente/extrato', component: ClienteExtratoComponent },
    { path: 'cliente/transferencia', component: ClienteTransferenciaComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routesCliente)],
    exports: [RouterModule]
  })
  export class AppRoutingModuleCliente { }