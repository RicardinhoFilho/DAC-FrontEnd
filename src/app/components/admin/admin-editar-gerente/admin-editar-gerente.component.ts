import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GerenteService } from '@components/gerente/services/gerente.service';
import { Gerente } from '@shared/models/gerente.model';

@Component({
  selector: 'app-admin-editar-gerente',
  templateUrl: './admin-editar-gerente.component.html',
  styleUrls: ['./admin-editar-gerente.component.scss']
})
export class AdminEditarGerenteComponent implements OnInit {

  @ViewChild("formGerente") formGerente!: NgForm;
  gerente!: Gerente;

  constructor(
    private gerenteService: GerenteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    const res = this.gerenteService.buscarPorID(id);
    if (res !== undefined) {
      this.gerente = res;
    }
    else {
      throw new Error("Gerente não encontrado: id = " + id);
    }
  }

  atualizar(): void  {
    if (this.formGerente.form.valid) {
      this.gerenteService.atualizar(this.gerente);
      this.router.navigate(['/admin/listar-gerente']);
    }
  }

}
