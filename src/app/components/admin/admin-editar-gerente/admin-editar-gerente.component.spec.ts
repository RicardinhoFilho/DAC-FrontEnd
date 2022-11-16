import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditarGerenteComponent } from './admin-editar-gerente.component';

describe('AdminEditarGerenteComponent', () => {
  let component: AdminEditarGerenteComponent;
  let fixture: ComponentFixture<AdminEditarGerenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditarGerenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditarGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
