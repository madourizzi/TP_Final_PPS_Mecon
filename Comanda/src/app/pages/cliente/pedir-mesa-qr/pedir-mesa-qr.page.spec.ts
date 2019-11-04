import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedirMesaQrPage } from './pedir-mesa-qr.page';

describe('PedirMesaQrPage', () => {
  let component: PedirMesaQrPage;
  let fixture: ComponentFixture<PedirMesaQrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedirMesaQrPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedirMesaQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
