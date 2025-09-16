import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { LoginCredentials, SignupData } from '../../Module/clusterAdminAuthModule';
import { apiResponse } from '../../Module/commonModule';

@Injectable({
  providedIn: 'root',
})
export class ClusterAdminAuthService {
  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) { }

  ClusterAdminUserLogin(payload: LoginCredentials): Observable<HttpResponse<apiResponse>> {
    const body = payload;
    return this.http
      .post<apiResponse>(`${this.apiUrl}/cluserAdminAuth/ClusterAdminLogin`, body, {
        observe: 'response',
      });
  }

  ClusterAdminUserSignup(payload:SignupData):Observable<HttpResponse<apiResponse>> {
    const body = payload;
    return this.http
      .post<apiResponse>(`${this.apiUrl}/cluserAdminAuth/ClusterAdminSignup`, body, {
        observe: 'response',
      });
  }

  ClusterAdminClusterIdCheck(clusterId:string): Observable<HttpResponse<apiResponse>> {
    const body = {clusterId};
    return this.http
      .post<apiResponse>(`${this.apiUrl}/cluserAdminAuth/ClusterIdCheck`, body, {
        observe: 'response',
      });
  }
}
