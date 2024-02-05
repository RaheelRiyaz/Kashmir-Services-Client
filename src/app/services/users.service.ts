import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../Models/api-response';
import { User } from '../Models/user';
import { Manager } from '../Models/manager';
import { EngineerResponse } from '../Models/engineer-response';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}
  getUsers(user: string): Observable<ApiResponse<User[]>> {
    return this.httpClient.get<ApiResponse<User[]>>(
      environment.apiBaseUrl + 'users/' + user
    );
  }

  getManagerEngineers(id:string): Observable<ApiResponse<EngineerResponse[]>> {
    return this.httpClient.get<ApiResponse<EngineerResponse[]>>(
      environment.apiBaseUrl + 'manager/all-engineers/managerid?managerid='+id
    );
  }

  getUserById(id: string): Observable<ApiResponse<User>> {
    return this.httpClient.get<ApiResponse<User>>(
      environment.apiBaseUrl + 'users/' + id
    );
  }

  updateUser(formData: FormData): Observable<any> {
    return this.httpClient.put(environment.apiBaseUrl + 'users', formData);
  }

  getUsersForDropdown(typeOfUser: string): Observable<ApiResponse<Manager[]>> {
    return this.httpClient.get<ApiResponse<Manager[]>>(
      environment.apiBaseUrl + 'users/' + typeOfUser
    );
  }

  filterUser(term:string,url:string):Observable<ApiResponse<User[]>>{
    return this.httpClient.get<ApiResponse<User[]>>(environment.apiBaseUrl+`users/${url}?searchTerm=${term}`)
  }
}
