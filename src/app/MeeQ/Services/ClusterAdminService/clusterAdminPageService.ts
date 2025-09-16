import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ConferenceRoom, } from '../../Module/clusterAdminPageModule';
import { apiResponse } from '../../Module/commonModule';

@Injectable({
    providedIn: 'root',
})
export class ClusterAdminPageService {
    private apiUrl = `${environment.apiUrl}/api`;

    constructor(private http: HttpClient) { }

    ClusterAddConferenceRoom(payload: ConferenceRoom,cluster_id: string): Observable<HttpResponse<apiResponse>> {
        const body = payload;

        return this.http.post<apiResponse>(`${this.apiUrl}/cluserAdminPage/addClusterConferenceRoom`,body,
            {
                observe: 'response',
                headers: new HttpHeaders({
                    'X-Cluster_ID': cluster_id
                })
            }
        );
    }

    ClusterupdateConferenceRoom(payload: ConferenceRoom,cluster_id: string): Observable<HttpResponse<apiResponse>> {
        console.log(payload)
        const body = payload;
        return this.http.put<apiResponse>(`${this.apiUrl}/cluserAdminPage/updateClusterConferenceRoom`,body,
            {
                observe: 'response',
                headers: new HttpHeaders({
                    'X-Cluster_ID': cluster_id
                })
            }
        );
    }



    ClusterGetConferenceRoom(cluster_id: string): Observable<HttpResponse<apiResponse>> {
        return this.http.get<apiResponse>(`${this.apiUrl}/cluserAdminPage/getClusterConferenceRoom`,
            {
                observe: 'response',
                headers: new HttpHeaders({
                    'X-Cluster_ID': cluster_id
                })
            }
        );
    }

    ClusterDeleteConferenceRoom(room_id:number,cluster_id: string): Observable<HttpResponse<apiResponse>> {
        return this.http.delete<apiResponse>(`${this.apiUrl}/cluserAdminPage/deleteClusterConferenceRoom`,
            {
                observe: 'response',
                headers: new HttpHeaders({
                    'X-Cluster_ID': cluster_id,
                    'X-Room_ID':room_id
                })
            }
        );
    }

    UpdateRoomAvailability (room_id:number,isAvailable:boolean,cluster_id: string): Observable<HttpResponse<apiResponse>> {
        return this.http.put<apiResponse>(`${this.apiUrl}/cluserAdminPage/updateClusterRoomAvailability`,{"isAvailable":isAvailable},
            {
                observe: 'response',
                headers: new HttpHeaders({
                    'X-Cluster_ID': cluster_id,
                    'X-Room_ID':room_id
                })
            }
        );
    }

}