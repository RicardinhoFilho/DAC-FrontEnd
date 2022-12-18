import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '@components/auth/services/user.service';
import { ClienteService } from '@components/cliente/services';
import { City } from '@shared/models/city.model';
import { Conta } from '@shared/models/conta.model';
import { State } from '@shared/models/state.model';
import { User } from '@shared/models/user.model';
import { CityService } from '@shared/services/city.service';
import { StateService } from '@shared/services/state.service';

@Component({
  selector: 'app-gerente-cliente-detalhes',
  templateUrl: './gerente-cliente-detalhes.component.html',
  styleUrls: ['./gerente-cliente-detalhes.component.scss'],
})
export class GerenteClienteDetalhesComponent implements OnInit {
  cpfFocus: string = "";
  user!: User | null;
  gerente!: User | null;
  conta!: Conta | null;
  errorMessage!: string | null;
  city!: City | null;
  state!: State | null;
 
  constructor(private route: ActivatedRoute, private userService: UserService,
    private stateService: StateService,  private contaService: ClienteService,
    private cityService: CityService) {}

  ngOnInit(): void {
    this.cpfFocus = (this.route.snapshot.params['cpf']);
    this.user =
    this.gerente =
    this.conta =
    this.errorMessage =
    this.city =
    this.state =
      null;
  this.userService.getUserByCPF(this.cpfFocus).subscribe((users: User[]) => {
    if (users.length === 0) {
      this.errorMessage = 'Nenhuma conta encontrada com esse CPF';
      return;
    }
    this.user = users[0];
    this.stateService
      .getStateById(this.user.estado!)
      .subscribe((state: State) => (this.state = state));
    this.cityService
      .getCityById(this.user.cidade!)
      .subscribe((city: City) => (this.city = city));
    this.contaService
      .buscarContaPorUserId(this.user.id!)
      .subscribe((conta: Conta[]) => {
        this.conta = conta[0];
        this.userService
          .getUserById(this.conta.idGerente!)
          .subscribe((gerente: User) => (this.gerente = gerente));
      });
  });
  }
}
