import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenteClienteDetalhesComponent } from './gerente-cliente-detalhes.component';

describe('GerenteClienteDetalhesComponent', () => {
  let component: GerenteClienteDetalhesComponent;
  let fixture: ComponentFixture<GerenteClienteDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenteClienteDetalhesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenteClienteDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
