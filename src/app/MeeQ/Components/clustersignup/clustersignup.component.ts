import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClusterAdminAuthService } from '../../Services/ClusterAdminService/clusterAdminAuthService';

@Component({
  selector: 'app-clustersignup',
  imports: [CommonModule, FormsModule],
  templateUrl: './clustersignup.component.html',
  styleUrl: './clustersignup.component.css'
})
export class ClustersignupComponent {

  @Output() closeModal = new EventEmitter<void>();
  @Output() switchToLoginModal = new EventEmitter<void>();

  constructor(private clusterAdminAuthService:ClusterAdminAuthService){}

  signupData = {
    clusterId: '',
    adminName: '',
    emailId: '',
    organizationName: '',
    password: ''
  };

  confirmPassword = '';

  clusterCheck(cluster_id: string) {
    if(cluster_id.length<5)return
    this.clusterAdminAuthService.ClusterAdminClusterIdCheck(cluster_id).subscribe({
      next:(response)=>{
        if(response.ok){
          console.log(response.body);
        }
      },
      error:()=>{

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

    // Simulate API call
    alert('Admin account created successfully!');
    this.closeModal.emit();
  }
}
