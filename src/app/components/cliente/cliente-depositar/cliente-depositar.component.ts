import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-cliente-depositar',
  templateUrl: './cliente-depositar.component.html',
  styleUrls: ['./cliente-depositar.component.scss']
})
export class ClienteDepositarComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
    deposito: new FormControl('', Validators.required),
    });
   }

  ngOnInit(): void {
  }

}
