import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminHomeComponent } from "./admin-home";

const routesAdmin: Routes = [
    { path: 'admin/home', component: AdminHomeComponent, },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routesAdmin)],
    exports: [RouterModule]
  })
  export class AppRoutingModuleAdmin { }