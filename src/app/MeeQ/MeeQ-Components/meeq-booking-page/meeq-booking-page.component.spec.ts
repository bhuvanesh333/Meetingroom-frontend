import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeeQBookingpageComponent } from './meeq-booking-page.component';

describe('MeeQBookingpageComponent', () => {
  let component: MeeQBookingpageComponent;
  let fixture: ComponentFixture<MeeQBookingpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeeQBookingpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeeQBookingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
