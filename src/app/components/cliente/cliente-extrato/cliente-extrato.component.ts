import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


export interface HardCodeExtrato {
  dataHora: string;
  operacao: string;
  cliente: string;
  valor: string;
  saldo: string;
}

const ELEMENT_DATA: HardCodeExtrato[] = [
  {dataHora: "15/07/2018", operacao: "Saque", cliente: "", valor: "-500", saldo: "1000"},
  {dataHora: "12/07/2018", operacao: "Transferencia", cliente: "Ete -> Teste", valor: "-200", saldo: "1500"},
  {dataHora: "07/07/2018", operacao: "Deposito", cliente: "", valor: "800", saldo: "1700"},
  {dataHora: "25/06/2018", operacao: "Transferencia", cliente: "Teste -> Ete", valor: "50", saldo: "850"},
];


@Component({
  selector: 'app-cliente-extrato',
  templateUrl: './cliente-extrato.component.html',
  styleUrls: ['./cliente-extrato.component.scss']
})
export class ClienteExtratoComponent implements OnInit {

  formExtrato: FormGroup;
  dateInicio = new FormControl(new Date());
  dateFinal = new FormControl(new Date());
  telaExtrato: boolean = false;

  displayedColumns: string[] = ['dataHora', 'operacao', 'cliente', 'valor', 'saldo'];
  dataSource = ELEMENT_DATA;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formExtrato = this.formBuilder.group({
    dateInicio: new FormControl('', Validators.required),
    dateFinal: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  trocarTela() {
    this.telaExtrato = !this.telaExtrato;
  }

}
