import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { LoginData, SignupData } from '../../Module/clusterUserAuthModule';
import { apiResponse } from '../../Module/commonModule';

@Injectable({
  providedIn: 'root',
})
export class ClusterUserAuthService {
  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) { }

  ClusterUserLogin(payload:LoginData):Observable<HttpResponse<apiResponse>> {
    const body = payload;
    return this.http
      .post<apiResponse>(`${this.apiUrl}/cluserUserAuth/ClusterUserLogin`, body, {
        observe: 'response',
      });
  }

  ClusterUserSignup(payload:SignupData):Observable<HttpResponse<apiResponse>> {
    const body = payload;
    return this.http
      .post<apiResponse>(`${this.apiUrl}/cluserUserAuth/ClusterUserSignup`, body, {
        observe: 'response',
      });
  }

  
}
