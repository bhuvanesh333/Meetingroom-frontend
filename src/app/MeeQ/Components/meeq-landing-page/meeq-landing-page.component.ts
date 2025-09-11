import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClusterloginComponent } from "../clusterlogin/clusterlogin.component";
import { ClustersignupComponent } from "../clustersignup/clustersignup.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'meeq-landing-page',
  templateUrl: './meeq-landing-page.component.html',
  styleUrls: ['./meeq-landing-page.component.css'],
  imports: [CommonModule, ClusterloginComponent, ClustersignupComponent]
})
export class MeeQLandingPageComponent {
  showClusterLogin: boolean = false;
  showClusterSignup: boolean = false;

  constructor(private route: ActivatedRoute) { }

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
    this.showClusterLogin = true;
    this.showClusterSignup = false; // Ensure only one modal is open
  }

  // Function to redirect to cluster signup page
  redirectToClusterSignup(): void {
    this.showClusterSignup = true;
    this.showClusterLogin = false; // Ensure only one modal is open
  }

  handleClose() {
    this.showClusterLogin = false;
    this.showClusterSignup = false;
  }

  handleSwitchToSignup() {
    this.showClusterLogin = false;
    this.showClusterSignup = true;
  }

  handleSwitchToLogin() {
    this.showClusterSignup = false;
    this.showClusterLogin = true;
  }

  handleForgot() {
    // e.g. navigate to forgot-password page or show form
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