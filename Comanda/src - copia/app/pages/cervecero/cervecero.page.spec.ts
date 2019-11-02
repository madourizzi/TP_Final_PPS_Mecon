import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CerveceroPage } from './cervecero.page';

describe('CerveceroPage', () => {
  let component: CerveceroPage;
  let fixture: ComponentFixture<CerveceroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CerveceroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CerveceroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
