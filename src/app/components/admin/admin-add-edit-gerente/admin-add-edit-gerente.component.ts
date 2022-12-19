import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@components/auth/services/user.service';
import { ClienteService } from '@components/cliente/services';
import { Conta } from '@shared/models/conta.model';
import { User } from '@shared/models/user.model';
import { lastValueFrom, map } from 'rxjs';

@Component({
  selector: 'app-admin-add-edit-gerente',
  templateUrl: './admin-add-edit-gerente.component.html',
  styleUrls: ['./admin-add-edit-gerente.component.scss'],
})
export class AdminAddEditGerenteComponent implements OnInit {
  @ViewChild('formGerente') formGerente!: NgForm;
  gerente!: User;
  id!: number;

  constructor(
    private userService: UserService,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params?.['id'];
    });

    if (this.id) {
      this.userService.getUserById(this.id).subscribe((gerente) => {
        this.gerente = gerente;
      });
    } else {
      this.gerente = new User();
    }
  }

  async getGerenteComMaisContas(id: number): Promise<User | null> {
    let gerenteOutput!: User | null;
    let clientesCount: number = 1;
    const gerentes: User[] = await lastValueFrom(
      this.userService.getGerentes()
    );
    await Promise.all(
      gerentes.map(async (gerente: User): Promise<void> => {
        await lastValueFrom(
          this.clienteService.getClientesByGerente(gerente.id!).pipe(
            map((clientes: Conta[]) => {
              if (clientesCount < clientes.length && gerente.id !== id) {
                gerenteOutput = gerente;
                clientesCount = clientes.length;
              }
            })
          )
        );
      })
    );
    return gerenteOutput;
  }

  inserir(): void {
    if (this.formGerente.form.valid) {
      this.gerente.cargo = 'gerente';
      this.userService.inserir(this.gerente).subscribe((newGerente: User) => {
        this.getGerenteComMaisContas(newGerente.id!).then((gerente) => {
          if (gerente) {
            this.clienteService
              .getClientesByGerente(gerente.id!)
              .subscribe((clientes) => {
                const conta = clientes[0];
                conta.idGerente = newGerente.id;
                this.clienteService
                  .atualizarContaCliente(conta)
                  .subscribe(() => {
                    confirm('Gerente cadastrado com sucesso!');
                    this.router.navigate(['/admin/listar-gerente']);
                  });
              });
          } else {
            confirm('Gerente cadastrado com sucesso!');
            this.router.navigate(['/admin/listar-gerente']);
          }
        });
      });
    }
  }

  atualizar(): void {
    if (this.formGerente.form.valid) {
      confirm('Gerente atualizado com sucesso!');
      this.userService.atualizarUser(this.gerente).subscribe(() => {
        this.router.navigate(['/admin/listar-gerente']);
      });
    }
  }

  async submit(): Promise<void> {
    let invalidUser: boolean = false;
    await lastValueFrom(
      this.userService
        .getUserByCPF(this.formGerente.form.get('cpf')?.value)
        .pipe(
          map((users: User[]) => {
            if (users.length > 0) {
              invalidUser = true;
              confirm('CPF já foi utilizado!');
            }
          })
        )
    );
    await lastValueFrom(
      this.userService
        .getUserByEmail(this.formGerente.form.get('email')?.value)
        .pipe(
          map((users: User[]) => {
            if (users.length > 0) {
              invalidUser = true;
              confirm('Email já foi utilizado!');
            }
          })
        )
    );
    if (invalidUser) return;

    this.id ? this.atualizar() : this.inserir();
  }

  phoneChange(): void {
    let phoneValue: string = this.formGerente.form.value.telefone;
    let numeric = phoneValue.replace(/[^0-9]+/g, '');
    let phoneLength = numeric.length;

    let partOne = '(' + numeric.slice(0, 2) + ') ';
    let partTwo = numeric.slice(2, 7) + '-';

    if (phoneLength < 2) {
      this.formGerente.form.controls['telefone'].setValue(numeric);
    } else if (phoneLength >= 3 && phoneLength < 6) {
      let formatPhone = partOne + numeric.slice(2);
      this.formGerente.form.controls['telefone'].setValue(formatPhone);
    } else if (phoneLength >= 6) {
      let formatPhone = partOne + partTwo + numeric.slice(7, 11);
      this.formGerente.form.controls['telefone'].setValue(formatPhone);
    }
  }

  cpfChange(): void {
    let cpfValue: string = this.formGerente.form.value.cpf;
    let numeric = cpfValue.replace(/[^0-9]+/g, '');
    let cpfLength = numeric.length;

    let partOne = numeric.slice(0, 3) + '.';
    let partTwo = numeric.slice(3, 6) + '.';
    let partThree = numeric.slice(6, 9) + '-';

    if (cpfLength < 4) {
      this.formGerente.form.controls['cpf'].setValue(numeric);
    } else if (cpfLength >= 4 && cpfLength < 7) {
      let formatCPF = partOne + numeric.slice(3);
      this.formGerente.form.controls['cpf'].setValue(formatCPF);
    } else if (cpfLength >= 7 && cpfLength < 10) {
      let formatCPF = partOne + partTwo + numeric.slice(6);
      this.formGerente.form.controls['cpf'].setValue(formatCPF);
    } else if (cpfLength >= 10 && cpfLength < 12) {
      let formatCPF = partOne + partTwo + partThree + numeric.slice(9);
      this.formGerente.form.controls['cpf'].setValue(formatCPF);
    } else if (cpfLength >= 12) {
      let formatCPF = partOne + partTwo + partThree + numeric.slice(9, 11);
      this.formGerente.form.controls['cpf'].setValue(formatCPF);
    }
  }
}
