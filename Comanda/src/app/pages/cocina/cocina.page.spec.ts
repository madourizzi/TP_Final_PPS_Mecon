import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CocinaPage } from './cocina.page';

describe('CocinaPage', () => {
  let component: CocinaPage;
  let fixture: ComponentFixture<CocinaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CocinaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CocinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
