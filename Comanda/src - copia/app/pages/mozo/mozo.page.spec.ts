import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MozoPage } from './mozo.page';

describe('MozoPage', () => {
  let component: MozoPage;
  let fixture: ComponentFixture<MozoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MozoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MozoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
