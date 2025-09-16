import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { LoginData, SignupData } from '../../Module/clusterUserAuthModule';
import { apiResponse } from '../../Module/commonModule';

@Injectable({
  providedIn: 'root',
})
export class ClusterUserPageService {
  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) { }

  ClusterUserGetAllBooking(cluster_id: string): Observable<HttpResponse<apiResponse>> {
    return this.http.get<apiResponse>(`${this.apiUrl}/cluserUserPage/ClusterUserGetAllBoking`, {
      observe: 'response',
      headers: new HttpHeaders({
        'X-Cluster_ID': cluster_id
      })
    });
  }




}
