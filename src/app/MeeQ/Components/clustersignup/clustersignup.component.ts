import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClusterAdminAuthService } from '../../Services/ClusterAdminService/clusterAdminAuthService';
import { SignupData } from '../../Module/clusterAdminAuthModule';

@Component({
  selector: 'app-clustersignup',
  imports: [CommonModule, FormsModule],
  templateUrl: './clustersignup.component.html',
  styleUrl: './clustersignup.component.css'
})
export class ClustersignupComponent {

  field_validator = {
    cluster_id: false
  }

  @Output() closeModal = new EventEmitter<void>();
  @Output() switchToLoginModal = new EventEmitter<void>();

  constructor(private clusterAdminAuthService: ClusterAdminAuthService) { }

  signupData: SignupData = {
    clusterId: '',
    adminName: '',
    emailId: '',
    organizationName: '',
    password: ''
  };

  confirmPassword = '';

  clusterCheck(cluster_id: string) {

    this.clusterAdminAuthService.ClusterAdminClusterIdCheck(cluster_id).subscribe({
      next: (response) => {
        if (response.ok) {
          this.field_validator.cluster_id = !response.body?.data;
        }
      },
      error: (error) => {
        if (error.status == 500) {
          alert('Internal server error');
        }
      }
    })

  }

  closeModals(): void {
    this.closeModal.emit();
  }

  switchToLogin(): void {
    this.switchToLoginModal.emit();
  }

  onSignup(): void {
    if (this.signupData.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Here you would typically call your authentication service
    console.log('Admin Signup Data:', this.signupData);

    this.clusterAdminAuthService.ClusterAdminUserSignup(this.signupData).subscribe(
      {
        next: (response) => {
          if (response.ok) {
            this.switchToLoginModal.emit();
            alert('Admin account created successfully!');
            this.closeModal.emit();
          } else if (response.status == 409) {
            alert(response.body?.message)
          }
        },
        error: (err) => {
          if (err.status == 500) {
            alert('Internal server error');
          }
        }
      }
    )
  }
}
