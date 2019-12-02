import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoresMenuComponent } from './colores-menu.component';

describe('ColoresMenuComponent', () => {
  let component: ColoresMenuComponent;
  let fixture: ComponentFixture<ColoresMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColoresMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColoresMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
