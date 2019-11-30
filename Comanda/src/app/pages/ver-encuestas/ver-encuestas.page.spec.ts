import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEncuestasPage } from './ver-encuestas.page';

describe('VerEncuestasPage', () => {
  let component: VerEncuestasPage;
  let fixture: ComponentFixture<VerEncuestasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerEncuestasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerEncuestasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
