import { Component } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'meeq-landing-page',
  templateUrl: './meeq-landing-page.component.html',
  styleUrls: ['./meeq-landing-page.component.css']
})
export class MeeQLandingPageComponent {

constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.route.queryParams.subscribe(params => {
  const target = params['scrollTo'];
  if (target) {
    setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 0);
  }
});

}

  // Function to redirect to cluster login page
  redirectToClusterLogin(): void {

    window.location.href = 'https://cluster.meeq.com/login';
  }
  
  // Function to handle normal user login
  normalUserLogin(): void {
    // Add your login logic here
    console.log('Normal user login');
  }
  
  // Function to handle normal user signup
  normalUserSignup(): void {
    // Add your signup logic here
    console.log('Normal user signup');
  }
  
  // Function to connect with Google Calendar
  connectGoogleCalendar(): void {
    // Add Google Calendar integration logic here
    console.log('Connect to Google Calendar');
  }
  
  // Function to view booking history
  viewBookingHistory(): void {
    // Add booking history logic here
    console.log('View booking history');
  }
}