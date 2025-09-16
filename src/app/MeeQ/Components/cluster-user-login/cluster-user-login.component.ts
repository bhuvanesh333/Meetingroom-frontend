import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ClusterUserData, LoginData } from '../../Module/clusterUserAuthModule';
import { ClusterUserAuthService } from '../../Services/ClusterUserService/clusterUserAuthService';

@Component({
  selector: 'cluster-user-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cluster-user-login.component.html',
  styleUrls: ['./cluster-user-login.component.css']
})
export class MeeqindexpageComponent {
  constructor(private router: Router, private clusterUserAuthService: ClusterUserAuthService) { }

  loginRequest: LoginData = {
    username: '',
    email: '',
    password: ''
  };

  // Function to handle login form submission
  onLogin(loginForm: any): void {
    if (loginForm.valid) {
      this.loginRequest = {
        username: '',
        email: '',
        password: ''
      };
      const loginValue = loginForm.value.username;
      this.loginRequest.password = loginForm.value.password;

    
      // Check if loginValue is email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmail = emailRegex.test(loginValue);

      if (isEmail) {
        this.loginRequest.email = loginValue;
      } else {
        this.loginRequest.username = loginValue;
      }

      this.clusterUserAuthService.ClusterUserLogin(this.loginRequest).subscribe({
        next: (response) => {
          if (response.ok) {
            localStorage.setItem("ClusterUserData", JSON.stringify(response.body?.data));
            this.router.navigate(['/MeeQBookingpage']);
          }
        },
        error: (err) => {
          if (err.status == 500) {
            alert('Internal server error');
          } else if (err.status == 401) {
            alert("Invalid username/email or password.")
          }
        }
      })
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