import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidateCPF } from '../..//shared/cpf-validator';
import { City } from './../../shared/models/city.model';
import { State } from './../../shared/models/state.model';
import { CityService } from './../../shared/services/city.service';
import { StateService } from './../../shared/services/state.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  states!: State[];
  cities!: City[];

  constructor(
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private stateService: StateService
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/
        ),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/
        ),
      ]),
      role: new FormControl('Cliente', Validators.required),
      cpf: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(\d{3}\.){2}\d{3}\-\d{2}$/),
        Validators.minLength(14),
        Validators.maxLength(14),
        ValidateCPF,
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/
        ),
      ]),
      salary: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      city: new FormControl({ value: '', disabled: true }, Validators.required),
      cep: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(\d{2}\.)\d{3}\-\d{3}$/),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      street: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      complement: new FormControl(''),
    });
  }

  ngOnInit() {
    this.stateService
      .getAllStates()
      .subscribe((states: State[]) => (this.states = states));
  }

  register(): void {
    console.log(this.form);
  }

  cpfChange(): void {
    let cpfValue: string = this.form.value.cpf;
    let numeric = cpfValue.replace(/[^0-9]+/g, '');
    let cpfLength = numeric.length;

    let partOne = numeric.slice(0, 3) + '.';
    let partTwo = numeric.slice(3, 6) + '.';
    let partThree = numeric.slice(6, 9) + '-';

    if (cpfLength < 4) {
      this.form.controls['cpf'].setValue(numeric);
    } else if (cpfLength >= 4 && cpfLength < 7) {
      let formatCPF = partOne + numeric.slice(3);
      this.form.controls['cpf'].setValue(formatCPF);
    } else if (cpfLength >= 7 && cpfLength < 10) {
      let formatCPF = partOne + partTwo + numeric.slice(6);
      this.form.controls['cpf'].setValue(formatCPF);
    } else if (cpfLength >= 10 && cpfLength < 12) {
      let formatCPF = partOne + partTwo + partThree + numeric.slice(9);
      this.form.controls['cpf'].setValue(formatCPF);
    } else if (cpfLength >= 12) {
      let formatCPF = partOne + partTwo + partThree + numeric.slice(9, 11);
      this.form.controls['cpf'].setValue(formatCPF);
    }
  }

  cepChange(): void {
    let cepValue: string = this.form.value.cep;
    let numeric = cepValue.replace(/[^0-9]+/g, '');
    let cepLength = numeric.length;

    let partOne = numeric.slice(0, 2) + '.';
    let partTwo = numeric.slice(2, 5) + '-';

    if (cepLength < 2) {
      this.form.controls['cep'].setValue(numeric);
    } else if (cepLength >= 3 && cepLength < 6) {
      let formatCEP = partOne + numeric.slice(2);
      this.form.controls['cep'].setValue(formatCEP);
    } else if (cepLength >= 6) {
      let formatCPF = partOne + partTwo + numeric.slice(5, 8);
      this.form.controls['cep'].setValue(formatCPF);
    }
  }

  phoneChange(): void {
    let phoneValue: string = this.form.value.phone;
    let numeric = phoneValue.replace(/[^0-9]+/g, '');
    let phoneLength = numeric.length;

    let partOne = '(' + numeric.slice(0, 2) + ') ';
    let partTwo = numeric.slice(2, 7) + '-';

    if (phoneLength < 2) {
      this.form.controls['phone'].setValue(numeric);
    } else if (phoneLength >= 3 && phoneLength < 6) {
      let formatPhone = partOne + numeric.slice(2);
      this.form.controls['phone'].setValue(formatPhone);
    } else if (phoneLength >= 6) {
      let formatPhone = partOne + partTwo + numeric.slice(7, 11);
      this.form.controls['phone'].setValue(formatPhone);
    }
  }

  fillCities($event: any): void {
    this.cityService
      .getCitiesByStateId(+this.form.get('state')?.value)
      .subscribe((cities: City[]) => {
        this.form.get('city')?.enable();
        this.cities = cities;
      });
  }

  get passwordsMatch(): boolean {
    return (
      this.form.get('password')?.value ===
      this.form.get('passwordConfirmation')?.value
    );
  }
}
