import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenteHomeComponent } from './gerente-home.component';

describe('AdminHomeComponent', () => {
  let component: GerenteHomeComponent;
  let fixture: ComponentFixture<GerenteHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenteHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenteHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
