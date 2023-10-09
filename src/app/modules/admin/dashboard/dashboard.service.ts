import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

const GETALLTASKS = environment.apiBaseUrl + '/api/tasks/v1/requests';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    constructor(private http: HttpClient) {}

    getAllRequests(): Observable<any> {
        return this.http.get(GETALLTASKS);
    }
}
