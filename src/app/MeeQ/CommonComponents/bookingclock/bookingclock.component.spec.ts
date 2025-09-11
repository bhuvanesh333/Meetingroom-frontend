import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingclockComponent } from './bookingclock.component';

describe('BookingclockComponent', () => {
  let component: BookingclockComponent;
  let fixture: ComponentFixture<BookingclockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingclockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingclockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
