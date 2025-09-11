import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, Input } from '@angular/core';

export interface TimeSlot {
  id: number;
  UserName: string;
  startTime: Date;
  endTime: Date;
  Description?: string;
}

export interface MeetingRoom {
  id: number;
  ConferenceRoomName: string;
  timeSlots?: TimeSlot[];
  Capacity: number;
  isAvailable: boolean;
  Floor: string;
}

@Component({
  selector: 'bookingclock',
  imports: [CommonModule],
  templateUrl: './bookingclock.component.html',
  styleUrl: './bookingclock.component.css'
})

export class BookingclockComponent implements AfterViewInit {
  @Input() roomData?: MeetingRoom;
  currentTime: Date = new Date();
  
  // Generate unique identifier for this component instance
  private uniqueId: string;

  // Combined room data with merged time slots
  combinedRoom: MeetingRoom = {
    id: 1,
    ConferenceRoomName: 'Conference Room A',
    Capacity: 12,
    isAvailable: true,
    Floor: '2nd Floor',
    timeSlots: []
  };

  meetingRooms: MeetingRoom = 
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
          UserName: 'bhuva',
          startTime: new Date(2024, 0, 1, 14, 0), // 9:00 AM
          endTime: new Date(2024, 0, 1, 15, 0), // 10:00 AM
          Description: 'Team Meeting',
        },
      ],
    };

  constructor() {
    // Generate unique ID for this component instance
    this.uniqueId = Math.random().toString(36).substr(2, 9);
  }
    
 private get currentRoom(): MeetingRoom {
    return this.roomData || this.meetingRooms;
  }

  ngAfterViewInit() {
    // Merge all time slots from different rooms into a single combined room
    this.mergeTimeSlots();

    setTimeout(() => {
      this.generateTickMarks(); // Add tick marks first
      this.generateHourMarkers();
      this.generateBookedArcs();
      this.generateClockHands();
      this.startClock();
    }, 10);
  }

  private mergeTimeSlots(): void {
    const allTimeSlots: TimeSlot[] = [];

      if (this.meetingRooms.timeSlots) {
        allTimeSlots.push(...this.meetingRooms.timeSlots);
      }

    this.combinedRoom.timeSlots = allTimeSlots;
  }

  private startClock(): void {
    setInterval(() => {
      this.currentTime = new Date();
      this.updateClockHands();
    }, 1000);
  }

  // New method to generate tick marks (minute and hour lines)
  private generateTickMarks(): void {
    const tickGroup = document.querySelector(`g[data-tick-marks="${this.uniqueId}"]`);
    if (!tickGroup) {
      // Create tick marks group if it doesn't exist
      const svg = document.querySelector(`.clock-${this.uniqueId}`);
      if (svg) {
        const tickMarkGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        tickMarkGroup.setAttribute('data-tick-marks', this.uniqueId);
        svg.appendChild(tickMarkGroup);
      }
    }

    const tickMarkGroup = document.querySelector(`g[data-tick-marks="${this.uniqueId}"]`);
    if (!tickMarkGroup) return;

    // Clear existing tick marks
    tickMarkGroup.innerHTML = '';

    // Generate minute marks (60 total)
    for (let minute = 0; minute < 60; minute++) {
      const angle = minute * 6 - 90; // 6 degrees per minute
      const radians = (angle * Math.PI) / 180;

      // Determine if this is an hour mark
      const isHourMark = minute % 5 === 0;

      // Set different lengths and styles for hour vs minute marks
      const outerRadius = 80;
      const innerRadius = isHourMark ? 70 : 75;
      const strokeWidth = isHourMark ? 1.2 : 1;
      const color = isHourMark ? '#333333' : '#cccccc';

      const x1 = 100 + innerRadius * Math.cos(radians);
      const y1 = 100 + innerRadius * Math.sin(radians);
      const x2 = 100 + outerRadius * Math.cos(radians);
      const y2 = 100 + outerRadius * Math.sin(radians);

      const tickMark = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      tickMark.setAttribute('x1', x1.toString());
      tickMark.setAttribute('y1', y1.toString());
      tickMark.setAttribute('x2', x2.toString());
      tickMark.setAttribute('y2', y2.toString());
      tickMark.setAttribute('stroke', color);
      tickMark.setAttribute('stroke-width', strokeWidth.toString());
      tickMark.setAttribute('stroke-linecap', 'round');

      tickMarkGroup.appendChild(tickMark);
    }
  }

  private generateClockHands(): void {
    const handsGroupElement = document.querySelector(
      `g[data-clock-hands="${this.uniqueId}"]`
    );
    if (!handsGroupElement) return;

    // Clear existing hands
    handsGroupElement.innerHTML = '';

    // Create hour hand
    const hourHand = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'line'
    );
    hourHand.setAttribute('id', `hour-hand-${this.uniqueId}`);
    hourHand.setAttribute('x1', '100');
    hourHand.setAttribute('y1', '100');
    hourHand.setAttribute('stroke', '#333333');
    hourHand.setAttribute('stroke-width', '4');
    hourHand.setAttribute('stroke-linecap', 'round');

    // Create minute hand
    const minuteHand = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'line'
    );
    minuteHand.setAttribute('id', `minute-hand-${this.uniqueId}`);
    minuteHand.setAttribute('x1', '100');
    minuteHand.setAttribute('y1', '100');
    minuteHand.setAttribute('stroke', '#666666');
    minuteHand.setAttribute('stroke-width', '2');
    minuteHand.setAttribute('stroke-linecap', 'round');

    // Create center dot
    const centerDot = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );
    centerDot.setAttribute('cx', '100');
    centerDot.setAttribute('cy', '100');
    centerDot.setAttribute('r', '3');
    centerDot.setAttribute('fill', '#333333');

    handsGroupElement.appendChild(hourHand);
    handsGroupElement.appendChild(minuteHand);
    handsGroupElement.appendChild(centerDot);

    // Initial positioning
    this.updateClockHands();
  }

  private updateClockHands(): void {
    const hours = this.currentTime.getHours() % 12;
    const minutes = this.currentTime.getMinutes();

    // Calculate angles (0 degrees = 12 o'clock position)
    const hourAngle = (hours * 30) + (minutes * 0.5) - 90; // -90 to start from 12 o'clock
    const minuteAngle = (minutes * 6) - 90; // -90 to start from 12 o'clock

    // Update hour hand
    const hourHand = document.getElementById(`hour-hand-${this.uniqueId}`);
    if (hourHand) {
      const hourLength = 45;
      const hourRadians = (hourAngle * Math.PI) / 180;
      const hourX2 = 100 + hourLength * Math.cos(hourRadians);
      const hourY2 = 100 + hourLength * Math.sin(hourRadians);

      hourHand.setAttribute('x2', hourX2.toString());
      hourHand.setAttribute('y2', hourY2.toString());
    }

    // Update minute hand
    const minuteHand = document.getElementById(`minute-hand-${this.uniqueId}`);
    if (minuteHand) {
      const minuteLength = 65;
      const minuteRadians = (minuteAngle * Math.PI) / 180;
      const minuteX2 = 100 + minuteLength * Math.cos(minuteRadians);
      const minuteY2 = 100 + minuteLength * Math.sin(minuteRadians);

      minuteHand.setAttribute('x2', minuteX2.toString());
      minuteHand.setAttribute('y2', minuteY2.toString());
    }
  }

  private generateHourMarkers(): void {
    const markersGroup = document.querySelector(`g[data-hour-markers="${this.uniqueId}"]`);
    if (!markersGroup) return;

    // Clear existing markers
    markersGroup.innerHTML = '';

    for (let hour = 0; hour < 12; hour++) {
      const angle = hour * 30 - 90; // Convert to SVG coordinates (12 o'clock = -90°)
      const radians = (angle * Math.PI) / 180;
      const x = 100 + 90 * Math.cos(radians); // Moved inward to accommodate tick marks
      const y = 100 + 90 * Math.sin(radians);

      // Create hour marker
      const marker = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'text'
      );
      marker.setAttribute('x', x.toString());
      marker.setAttribute('y', y.toString());
      marker.setAttribute('text-anchor', 'middle');
      marker.setAttribute('font-size', '14');
      marker.setAttribute('font-weight', '600');
      marker.setAttribute('fill', '#000000ff');
      marker.setAttribute('dominant-baseline', 'central');
      marker.textContent = hour === 0 ? '12' : hour.toString();

      markersGroup.appendChild(marker);
    }
  }

  private generateBookedArcs(): void {
    const bookedGroupElement = document.querySelector(
      `g[data-booked-group="${this.uniqueId}"]`
    );
    if (!bookedGroupElement) return;

    // Clear existing arcs
    bookedGroupElement.innerHTML = '';

    const allBookings = this.currentRoom.timeSlots || [];

    allBookings.forEach((booking) => {
      const startAngle = this.timeToAngle(booking.startTime);
      const endAngle = this.timeToAngle(booking.endTime);

      // Handle overnight bookings
      let actualEndAngle = endAngle;
      if (endAngle <= startAngle) {
        actualEndAngle = endAngle + 360;
      }

      const start_hours = booking.startTime.getHours();
      const end_hours = booking.endTime.getHours();
      const start_amPm = start_hours >= 12 ? 'PM' : 'AM';
      const end_amPm = end_hours >= 12 ? 'PM' : 'AM';

      let radius = 90;
      let color = '#FF5722'; // mixed meetings
      let strokewidth = '12'
      if ((start_amPm == end_amPm) && start_amPm == 'AM') {
        radius = 75; // Adjusted to fit with tick marks
        color = '#4CAF50'; // AM meetings
        strokewidth = '8'
      } else if ((start_amPm == end_amPm) && start_amPm == 'PM') {
        radius = 103; // Adjusted to fit outside tick marks
        color = '#2196F3'; // PM meetings
        strokewidth = '8'
      }

      const path = this.createArcPath(startAngle, actualEndAngle, radius);

      const pathElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );
      pathElement.setAttribute('d', path);
      pathElement.setAttribute('fill', 'none');
      pathElement.setAttribute('stroke', color);
      pathElement.setAttribute('stroke-width', strokewidth);
      pathElement.setAttribute('stroke-linecap', 'butt');
      pathElement.setAttribute('opacity', '0.9');
      // Add shadow effect
      const shadowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      shadowPath.setAttribute('d', path);
      shadowPath.setAttribute('fill', 'none');
      shadowPath.setAttribute('stroke', 'rgba(0,0,0,0.1)');
      shadowPath.setAttribute('stroke-width', strokewidth);
      shadowPath.setAttribute('stroke-linecap', 'butt');
      shadowPath.setAttribute('transform', 'translate(1, 1)');

      bookedGroupElement.appendChild(shadowPath);
      bookedGroupElement.appendChild(pathElement);
    });
  }

  private timeToAngle(time: Date): number {
    const minutes = this.timeToMinutesSince12(time);
    return (minutes / 720) * 360; // 720 minutes = 360 degrees
  }

  private timeToMinutesSince12(time: Date): number {
    if (!time) return 0;
    let hours = time.getHours() % 12; // Convert to 12-hour format (0-11)
    const minutes = time.getMinutes();
    return hours * 60 + minutes; // 0-719 minutes
  }

  private createArcPath(startAngle: number, endAngle: number, rad: number): string {
    const radius = rad;
    const centerX = 100;
    const centerY = 100;

    const startRadians = ((startAngle - 90) * Math.PI) / 180;
    const endRadians = ((endAngle - 90) * Math.PI) / 180;

    const startX = centerX + radius * Math.cos(startRadians);
    const startY = centerY + radius * Math.sin(startRadians);
    const endX = centerX + radius * Math.cos(endRadians);
    const endY = centerY + radius * Math.sin(endRadians);

    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;
  }

  // Getter to expose uniqueId to template
  get clockId(): string {
    return this.uniqueId;
  }
}