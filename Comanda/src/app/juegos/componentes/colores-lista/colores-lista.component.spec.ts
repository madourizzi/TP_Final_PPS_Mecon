import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoresListaComponent } from './colores-lista.component';

describe('ColoresListaComponent', () => {
  let component: ColoresListaComponent;
  let fixture: ComponentFixture<ColoresListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColoresListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColoresListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
