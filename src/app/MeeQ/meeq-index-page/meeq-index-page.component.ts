import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'meeq-index-page',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './meeq-index-page.component.html',
  styleUrls: ['./meeq-index-page.component.css']
})
export class MeeqindexpageComponent {
  constructor(private router: Router) { }

  // Function to handle login form submission
  onLogin(loginForm: any): void {

    if (loginForm.valid) {
      // Add your login logic here
      console.log('Login form submitted', loginForm.value);
      // Redirect to dashboard or home page after successful login
      this.router.navigate(['/MeeQBookingpage'])
    }
  }

  // Function to redirect to signup page
  redirectToSignup(): void {
    this.router.navigate(['/signup']);
  }

  // Function to redirect to forgot password page
  redirectToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  // Function to redirect to home page when logo is clicked
  redirectToHome(): void {
    this.router.navigate(['/']);
  }

  // Function to open a URL in a new browser tab
  openChrome(): void {
    window.open('http://localhost:4200/Home?scrollTo=Login', '_blank');

  }
}