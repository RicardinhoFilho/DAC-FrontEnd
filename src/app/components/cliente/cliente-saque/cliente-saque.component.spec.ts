import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteSaqueComponent } from './cliente-saque.component';

describe('ClienteSaqueComponent', () => {
  let component: ClienteSaqueComponent;
  let fixture: ComponentFixture<ClienteSaqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteSaqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteSaqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
