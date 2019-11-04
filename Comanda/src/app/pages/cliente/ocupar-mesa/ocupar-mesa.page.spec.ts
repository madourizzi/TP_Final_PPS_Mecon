import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcuparMesaPage } from './ocupar-mesa.page';

describe('OcuparMesaPage', () => {
  let component: OcuparMesaPage;
  let fixture: ComponentFixture<OcuparMesaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcuparMesaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcuparMesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
