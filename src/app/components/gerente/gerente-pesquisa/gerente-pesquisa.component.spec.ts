import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerentePesquisaComponent } from './gerente-pesquisa.component';

describe('GerentePesquisaComponent', () => {
  let component: GerentePesquisaComponent;
  let fixture: ComponentFixture<GerentePesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerentePesquisaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerentePesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
