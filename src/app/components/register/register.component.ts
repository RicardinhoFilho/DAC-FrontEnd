import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidateCPF } from '../..//shared/cpf-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      cpf: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(\d{3}\.){2}\d{3}\-\d{2}$/),
        Validators.minLength(14),
        Validators.maxLength(14),
        ValidateCPF,
      ]),
      phone: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      cep: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(\d{2}\.){3}\-\d{3}$/),
        Validators.minLength(8),
        Validators.maxLength(8),
      ]),
      street: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      complement: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  register(): void {
    console.log(this.form.value);
  }
}
