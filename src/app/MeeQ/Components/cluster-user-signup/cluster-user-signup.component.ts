import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignupData } from '../../Module/clusterUserAuthModule';
import { ClusterUserAuthService } from '../../Services/ClusterUserService/clusterUserAuthService';

@Component({
  selector: 'cluster-user-signup',
  imports: [CommonModule, FormsModule],
  templateUrl: './cluster-user-signup.component.html',
  styleUrl: './cluster-user-signup.component.css'
})
export class ClusterUserSignupComponent {

  @Output() closeModal = new EventEmitter<void>();
  @Output() switchToLoginModal = new EventEmitter<void>();

  signupData: SignupData = {
    fullname: '',
    username: '',
    emailId: '',
    clusterId: '',
    password: ''
  };

  confirmPassword = '';
  showPassword = false;
  agreeToTerms = false;
  isLoading = false;


  constructor(private clusterUserAuthService: ClusterUserAuthService) { }

  onOverlayClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeModal.emit();
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  getPasswordStrength(): string {
    const password = this.signupData.password;
    if (!password) return '';

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

    if (strength <= 2) return 'strength-weak';
    if (strength === 3) return 'strength-medium';
    return 'strength-strong';
  }

  getPasswordStrengthText(): string {
    const strengthClass = this.getPasswordStrength();
    switch (strengthClass) {
      case 'strength-weak': return 'Weak';
      case 'strength-medium': return 'Medium';
      case 'strength-strong': return 'Strong';
      default: return '';
    }
  }

  switchToLogin(): void {
    this.switchToLoginModal.emit();
  }

  onSignup(): void {
    if (!this.agreeToTerms) {
      return;
    }

    this.isLoading = true;

    // Simulate API call
    setTimeout(() => {
      console.log('Normal User Signup Data:', this.signupData);
      this.clusterUserAuthService.ClusterUserSignup(this.signupData).subscribe(
        {
          next: (response) => {
            if (response.ok) {

            }
          },
          error: (err) => {
            if (err.status == 500) {
              alert('Internal server error');
            }
          }
        }
      )

      this.isLoading = false;
      this.closeModal.emit();
    }, 2000);
  }
}
