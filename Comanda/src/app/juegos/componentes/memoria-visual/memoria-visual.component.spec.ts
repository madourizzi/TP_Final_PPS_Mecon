import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoriaVisualComponent } from './memoria-visual.component';

describe('MemoriaVisualComponent', () => {
  let component: MemoriaVisualComponent;
  let fixture: ComponentFixture<MemoriaVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoriaVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoriaVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
