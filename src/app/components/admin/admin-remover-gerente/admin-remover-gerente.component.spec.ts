import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRemoverGerenteComponent } from './admin-remover-gerente.component';

describe('AdminRemoverGerenteComponent', () => {
  let component: AdminRemoverGerenteComponent;
  let fixture: ComponentFixture<AdminRemoverGerenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRemoverGerenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRemoverGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
