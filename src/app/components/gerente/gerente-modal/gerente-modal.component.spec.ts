import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenteModalComponent } from './gerente-modal.component';

describe('GerenteModalComponent', () => {
  let component: GerenteModalComponent;
  let fixture: ComponentFixture<GerenteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenteModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
