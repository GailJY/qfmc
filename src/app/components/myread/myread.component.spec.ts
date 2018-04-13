import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyreadComponent } from './myread.component';

describe('MyreadComponent', () => {
  let component: MyreadComponent;
  let fixture: ComponentFixture<MyreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
