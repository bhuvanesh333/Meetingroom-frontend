import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClusterloginComponent } from "../cluster-admin-login/cluster-admin-login.component";
import { ClustersignupComponent } from "../cluster-admin-signup/cluster-admin-signup.component";

import { CommonModule } from '@angular/common';
import { ClusterUserSignupComponent } from '../cluster-user-signup/cluster-user-signup.component';

@Component({
  selector: 'meeq-landing-page',
  templateUrl: './meeq-landing-page.component.html',
  styleUrls: ['./meeq-landing-page.component.css'],
  imports: [
    CommonModule, 
    ClusterloginComponent, 
    ClustersignupComponent,
    ClusterUserSignupComponent
  ]
})
export class MeeQLandingPageComponent {
  showClusterLogin: boolean = false;
  showClusterSignup: boolean = false;
  showClusterUserLogin: boolean = false;
  showClusterUserSignup: boolean = false;

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

  // Cluster user functions
  redirectToClusterLogin(): void {
    this.closeAllModals();
    this.showClusterLogin = true;
  }

  redirectToClusterSignup(): void {
    this.closeAllModals();
    this.showClusterSignup = true;
  }

  // Cluster user functions
  clusterUserLogin(): void {
    this.closeAllModals();
    this.showClusterUserLogin = true;
  }

  clusterUserSignup(): void {
    this.closeAllModals();
    this.showClusterUserSignup = true;
  }

  // Modal management functions
  closeAllModals(): void {
    this.showClusterLogin = false;
    this.showClusterSignup = false;
    this.showClusterUserLogin = false;
    this.showClusterUserSignup = false;
  }

  handleClose(): void {
    this.closeAllModals();
  }

  // Cluster modal switches
  handleSwitchToSignup(): void {
    this.showClusterLogin = false;
    this.showClusterSignup = true;
  }

  handleSwitchToLogin(): void {
    this.showClusterSignup = false;
    this.showClusterLogin = true;
  }

  // Cluster user modal switches
  handleClusterUserSwitchToSignup(): void {
    this.showClusterUserLogin = false;
    this.showClusterUserSignup = true;
  }

  handleClusterUserSwitchToLogin(): void {
    this.showClusterUserSignup = false;
    this.showClusterUserLogin = true;
  }

  handleForgotPassword(): void {
    // Handle forgot password logic here
    console.log('Forgot password clicked');
    // You can implement a forgot password modal or redirect
  }

  // Utility functions
  connectGoogleCalendar(): void {
    // Add Google Calendar integration logic here
    console.log('Connect to Google Calendar');
  }

  viewBookingHistory(): void {
    // Add booking history logic here
    console.log('View booking history');
  }
}