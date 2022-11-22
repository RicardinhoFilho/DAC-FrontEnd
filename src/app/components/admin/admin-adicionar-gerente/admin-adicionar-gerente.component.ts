import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GerenteService } from '@components/gerente/services/gerente.service';
import { Gerente } from '@shared/models/gerente.model';

@Component({
  selector: 'app-admin-adicionar-gerente',
  templateUrl: './admin-adicionar-gerente.component.html',
  styleUrls: ['./admin-adicionar-gerente.component.scss']
})
export class AdminAdicionarGerenteComponent implements OnInit {

  @ViewChild ('formGerente') formGerente !: NgForm;
  gerente !: Gerente;

  constructor(
    private gerenteService: GerenteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.gerente = new Gerente();
  }

  inserir(): void {
    if (this.formGerente.form.valid) {
      this.gerenteService.inserir(this.gerente);
      this.router.navigate(["/admin/listar-gerente"]);
    }
  }

}
