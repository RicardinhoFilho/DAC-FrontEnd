import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AdminAdicionarGerenteComponent } from "./admin-adicionar-gerente/admin-adicionar-gerente.component";
import { AdminEditarGerenteComponent } from "./admin-editar-gerente/admin-editar-gerente.component";
import { AdminHomeComponent } from "./admin-home";
import { AdminListarGerenteComponent } from "./admin-listar-gerente/admin-listar-gerente.component";
import { AdminRelatorioComponent } from "./admin-relatorio/admin-relatorio.component";
import { AdminRemoverGerenteComponent } from "./admin-remover-gerente/admin-remover-gerente.component";

const routesAdmin: Routes = [
    { path: 'admin/home', component: AdminHomeComponent, },
    { path: 'admin/listar-gerente', component: AdminListarGerenteComponent },
    { path: 'admin/adicionar-gerente', component: AdminAdicionarGerenteComponent },
    { path: 'admin/remover-gerente', component: AdminRemoverGerenteComponent },
    { path: 'admin/editar-gerente/:id', component: AdminEditarGerenteComponent },
    { path: 'admin/relatorio', component: AdminRelatorioComponent}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routesAdmin), FormsModule],
    exports: [RouterModule]
  })
  export class AppRoutingModuleAdmin { }