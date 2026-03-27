import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardModel } from './dashboard-model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<DashboardModel>('/financy/v1/dashboard');
  }
}
