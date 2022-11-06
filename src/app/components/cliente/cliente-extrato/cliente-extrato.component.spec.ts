import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteExtratoComponent } from './cliente-extrato.component';

describe('ClienteExtratoComponent', () => {
  let component: ClienteExtratoComponent;
  let fixture: ComponentFixture<ClienteExtratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteExtratoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteExtratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
