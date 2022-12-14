import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteService } from '@components/cliente/services';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Conta } from '@shared/models/conta.model';
import { User } from '@shared/models/user.model';
interface IClienteCompleto {
  conta: Conta;
  cliente: User;
}
@Component({
  selector: 'app-gerente-modal',
  templateUrl: './gerente-modal.component.html',
  styleUrls: ['./gerente-modal.component.scss'],
})
export class GerenteModalComponent implements OnInit {
  @ViewChild('form') form!: NgForm;
  @Input() cliente!: IClienteCompleto;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  motivo!: string;

  constructor(
    public activeModal: NgbActiveModal,
    private contaService: ClienteService
  ) {}

  ngOnInit(): void {
    console.log(this.cliente);
  }

  submit() {
    const newConta: Conta = Object.assign({}, this.cliente.conta);
    newConta.rejeitadoMotivo = this.motivo;
    newConta.rejeitadoData = new Date();
    this.contaService.atualizarContaCliente(newConta).subscribe(() => {
      this.passEntry.emit();
      this.activeModal.close();
    });
  }
}
