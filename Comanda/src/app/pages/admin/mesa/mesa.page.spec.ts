import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaPage } from './mesa.page';

describe('MesaPage', () => {
  let component: MesaPage;
  let fixture: ComponentFixture<MesaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
