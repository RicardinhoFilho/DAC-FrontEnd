import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListarGerenteComponent } from './admin-listar-gerente.component';

describe('AdminListarGerenteComponent', () => {
  let component: AdminListarGerenteComponent;
  let fixture: ComponentFixture<AdminListarGerenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListarGerenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminListarGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
