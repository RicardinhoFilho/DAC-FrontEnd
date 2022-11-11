import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente-transferencia',
  templateUrl: './cliente-transferencia.component.html',
  styleUrls: ['./cliente-transferencia.component.scss']
})
export class ClienteTransferenciaComponent implements OnInit {

  formTransferencia: FormGroup;
  date = new FormControl(new Date());

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formTransferencia = this.formBuilder.group({
    valorTransferencia: new FormControl('', Validators.required),
    contaTransferencia: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

}
