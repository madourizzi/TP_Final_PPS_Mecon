import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarmanPage } from './barman.page';

describe('BarmanPage', () => {
  let component: BarmanPage;
  let fixture: ComponentFixture<BarmanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarmanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarmanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
