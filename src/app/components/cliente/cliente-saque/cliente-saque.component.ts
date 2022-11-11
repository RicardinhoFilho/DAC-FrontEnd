import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente-saque',
  templateUrl: './cliente-saque.component.html',
  styleUrls: ['./cliente-saque.component.scss']
})
export class ClienteSaqueComponent implements OnInit {

  formSaque: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formSaque= this.formBuilder.group({
    saque: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

}
