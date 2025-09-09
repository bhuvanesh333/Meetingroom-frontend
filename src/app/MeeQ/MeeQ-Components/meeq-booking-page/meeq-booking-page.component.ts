import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { MeetingRoom, TimeSlot, BookingclockComponent } from '../../../bookingclock/bookingclock.component';
import { formatTo12Hour, toTitleCase } from '../../../utils/utils';

@Component({
  selector: 'meeq-booking-page',
  imports: [CommonModule, BookingclockComponent],
  templateUrl: './meeq-booking-page.component.html',
  styleUrl: './meeq-booking-page.component.css'
})
export class MeeQBookingpageComponent {
  // ViewChild to access the info panel element
  @ViewChild('infoPanelRef', { static: false }) infoPanelRef!: ElementRef;

  //utils
  formatTo12Hour = formatTo12Hour;
  toTitleCase = toTitleCase;

  //Variable
  bookings: TimeSlot[] = [];
  selectedRoom: MeetingRoom | null = null;
  selectedRoomBookings: TimeSlot[] = [];
  isHoveringRoomCard = false;

  meetingRooms: MeetingRoom[] = [
    {
      id: 1,
      ConferenceRoomName: 'Conference Room A',
      Capacity: 12,
      isAvailable: true,
      Floor: '2nd Floor',
      timeSlots: [
        {
          id: 1,
          UserName: 'bhuva',
          startTime: new Date(2024, 0, 1, 9, 0), // 9:00 AM
          endTime: new Date(2024, 0, 1, 10, 0), // 10:00 AM
          Description: 'Team Meeting',
        },
        {
          id: 2,
          UserName: 'raj',
          startTime: new Date(2024, 0, 1, 9, 0), // 9:00 AM
          endTime: new Date(2024, 0, 1, 10, 0), // 10:00 AM
          Description: 'Team Meeting',
        },
      ],
    },
    {
      id: 2,
      ConferenceRoomName: 'Conference Room B',
      Capacity: 12,
      isAvailable: true,
      Floor: '1st Floor',
      timeSlots: [
        {
          id: 1,
          UserName: 'bhuva',
          startTime: new Date(2024, 0, 1, 14, 0), // 2:00 PM
          endTime: new Date(2024, 0, 1, 15, 0), // 3:00 PM
          Description: 'Team Meeting',
        },
      ],
    },
    {
      id: 3,
      ConferenceRoomName: 'Conference Room C',
      Capacity: 12,
      isAvailable: true,
      Floor: '1st Floor',
      timeSlots: [
        {
          id: 1,
          UserName: 'bhuva',
          startTime: new Date(2024, 0, 1, 11, 0), // 11:00 AM
          endTime: new Date(2024, 0, 1, 13, 0), // 1:00 PM
          Description: 'Team Meeting',
        },
      ],
    },
  ];

  selectRoom(room: MeetingRoom): void {
    this.selectedRoom = room;
    this.loadRoomBookings(room);
    console.log('Selected room:', room.ConferenceRoomName);
  }

  private loadRoomBookings(room: MeetingRoom): void {
    this.bookings = room.timeSlots || [];
    this.selectedRoomBookings = [...this.bookings];
    this.bookings.sort((a, b) => {
      const aStart = this.timeToMinutesSince12(a.startTime);
      const bStart = this.timeToMinutesSince12(b.startTime);
      return aStart - bStart;
    });
  }

  trackByRoomId(index: number, room: MeetingRoom): number {
    return room.id;
  }

  timeToMinutesSince12(date: Date) {
    const hours = date.getHours();        // 0–23
    const minutes = date.getMinutes();    // 0–59
    return hours * 60 + minutes;
  }

  // New methods for scroll functionality
  onRoomCardMouseEnter(room: MeetingRoom): void {
    this.isHoveringRoomCard = true;
    this.selectRoom(room);
  }

  onRoomCardMouseLeave(): void {
    this.isHoveringRoomCard = false;
  }

  onRoomCardWheel(event: WheelEvent): void {
    if (this.isHoveringRoomCard && this.infoPanelRef) {
      event.preventDefault(); // Prevent default scroll behavior
      
      const infoPanelElement = this.infoPanelRef.nativeElement;
      const scrollAmount = event.deltaY; // Get scroll direction and amount
      
      // Apply scroll to the info panel
      infoPanelElement.scrollTop += scrollAmount;
    }
  }
}