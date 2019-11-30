import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegosComponent } from './juegos.component';

describe('JuegosComponent', () => {
  let component: JuegosComponent;
  let fixture: ComponentFixture<JuegosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuegosComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuegosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
