import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/api-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(private httpClient: HttpClient) {}

  // Common Function for posting to database
  Post<ReqT, ResT>(model: ReqT, url: string): Observable<ApiResponse<ResT>> {
    return this.httpClient.post<ApiResponse<ResT>>(
      environment.apiBaseUrl + url,
      model
    );
  }

  // Common Function for retrieving data from database
  Fetch<ResT>(url: string): Observable<ApiResponse<ResT>> {
    return this.httpClient.get<ApiResponse<ResT>>(environment.apiBaseUrl + url);
  }
  // Common Function for delete data from database
  Delete<ResT>(url: string): Observable<ApiResponse<ResT>> {
    return this.httpClient.delete<ApiResponse<ResT>>(
      environment.apiBaseUrl + url
    );
  }

  // Common Function for updating data into database
  Update<ReqT, ResT>(model: ReqT, url: string): Observable<ApiResponse<ResT>> {
    return this.httpClient.put<ApiResponse<ResT>>(
      environment.apiBaseUrl + url,
      model
    );
  }

  // Common Function for retrieving specific item from database
  Find<ResT>(url: string): Observable<ApiResponse<ResT>> {
    return this.httpClient.get<ApiResponse<ResT>>(environment.apiBaseUrl + url);
  }

}
