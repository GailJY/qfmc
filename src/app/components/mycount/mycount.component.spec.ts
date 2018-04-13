import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycountComponent } from './mycount.component';

describe('MycountComponent', () => {
  let component: MycountComponent;
  let fixture: ComponentFixture<MycountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
