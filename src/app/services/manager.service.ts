import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AssignEngineer } from '../Models/assignEngineer';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../Models/api-response';
import { CategoryResponse } from '../Models/category';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  constructor(private httpClient: HttpClient) {}

  assignEngineer(model: AssignEngineer): Observable<ApiResponse<any>> {
    return this.httpClient.post<ApiResponse<any>>(
      environment.apiBaseUrl + 'manager/assign-engineer-jobrole',
      model
    );
  }

  getCategories(id: string = ''): Observable<ApiResponse<CategoryResponse[]>> {
    return this.httpClient.get<ApiResponse<CategoryResponse[]>>(
      environment.apiBaseUrl + `manager/categories/managerid?managerid=${id}`
    );
  }

  managerBookings(id: string = ''): Observable<ApiResponse<any>> {
    return this.httpClient.get<ApiResponse<any>>(
      environment.apiBaseUrl + 'manager/manager-bookings'
    );
  }
}
