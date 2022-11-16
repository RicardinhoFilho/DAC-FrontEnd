import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdicionarGerenteComponent } from './admin-adicionar-gerente.component';

describe('AdminAdicionarGerenteComponent', () => {
  let component: AdminAdicionarGerenteComponent;
  let fixture: ComponentFixture<AdminAdicionarGerenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAdicionarGerenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAdicionarGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
