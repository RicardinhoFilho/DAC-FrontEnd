import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteTransferenciaComponent } from './cliente-transferencia.component';

describe('ClienteTransferenciaComponent', () => {
  let component: ClienteTransferenciaComponent;
  let fixture: ComponentFixture<ClienteTransferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteTransferenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteTransferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
