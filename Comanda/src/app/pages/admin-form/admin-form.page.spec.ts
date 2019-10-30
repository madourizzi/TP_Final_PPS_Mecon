import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormPage } from './admin-form.page';

describe('AdminFormPage', () => {
  let component: AdminFormPage;
  let fixture: ComponentFixture<AdminFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
