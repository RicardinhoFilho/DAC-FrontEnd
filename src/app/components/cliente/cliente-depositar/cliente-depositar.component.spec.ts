import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDepositarComponent } from './cliente-depositar.component';

describe('ClienteDepositarComponent', () => {
  let component: ClienteDepositarComponent;
  let fixture: ComponentFixture<ClienteDepositarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteDepositarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteDepositarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
