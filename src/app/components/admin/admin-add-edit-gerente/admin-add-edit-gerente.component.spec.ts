import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddEditGerenteComponent } from './admin-add-edit-gerente.component';

describe('AdminAddEditGerenteComponent', () => {
  let component: AdminAddEditGerenteComponent;
  let fixture: ComponentFixture<AdminAddEditGerenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddEditGerenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddEditGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
