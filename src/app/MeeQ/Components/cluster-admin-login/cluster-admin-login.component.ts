import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClusterAdminAuthService } from '../../Services/ClusterAdminService/clusterAdminAuthService';
import { LoginCredentials } from '../../Module/clusterAdminAuthModule';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'clusterlogin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cluster-admin-login.component.html',
  styleUrl: './cluster-admin-login.component.css'
})
export class ClusterloginComponent {
  @Output() closeModal = new EventEmitter<void>();

  loginCredentials: LoginCredentials = {
    clusterId: '',
    password: ''
  };

  showPassword: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';



  constructor(private clusterAdminAuthService: ClusterAdminAuthService,
    private route:Router
  ) { }

  onSubmit() {
    if (!this.loginCredentials.clusterId.trim()) {
      this.errorMessage = 'Cluster ID is required';
      return;
    }

    if (!this.loginCredentials.password.trim()) {
      this.errorMessage = 'Password is required';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';


    setTimeout(() => {
      this.clusterAdminAuthService.ClusterAdminUserLogin(this.loginCredentials).subscribe(
        {
          next: ((response) => {
            if (response.ok) {
                alert("Login Success")
                localStorage.setItem("ClusterId",response.body?.data)
                this.route.navigate(['/clusterPage'])
                this.closeModal.emit();
            }
          }),
          error: (error) => {
            if (error.status == 401) {
              alert('Invalid Email and Password');
            }
          },
        }

      )
      this.isLoading = false;
      
    }, 1000);
  }

  onClose() {
    this.closeModal.emit();
  }

  onForgotPassword() {
    this.closeModal.emit();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  clearError() {
    this.errorMessage = '';
  }
}