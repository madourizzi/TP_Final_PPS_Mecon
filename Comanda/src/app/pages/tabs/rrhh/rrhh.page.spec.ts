import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RrhhPage } from './rrhh.page';

describe('RrhhPage', () => {
  let component: RrhhPage;
  let fixture: ComponentFixture<RrhhPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RrhhPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RrhhPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
