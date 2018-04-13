import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycountdetailsComponent } from './mycountdetails.component';

describe('MycountdetailsComponent', () => {
  let component: MycountdetailsComponent;
  let fixture: ComponentFixture<MycountdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycountdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycountdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
