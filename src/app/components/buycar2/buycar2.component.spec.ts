import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Buycar2Component } from './buycar2.component';

describe('Buycar2Component', () => {
  let component: Buycar2Component;
  let fixture: ComponentFixture<Buycar2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Buycar2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Buycar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
