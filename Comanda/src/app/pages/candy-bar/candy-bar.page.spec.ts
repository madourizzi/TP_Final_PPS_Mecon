import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandyBarPage } from './candy-bar.page';

describe('CandyBarPage', () => {
  let component: CandyBarPage;
  let fixture: ComponentFixture<CandyBarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandyBarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandyBarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
