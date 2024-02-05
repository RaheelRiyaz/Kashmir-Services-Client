import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedInCredentials } from '../Models/loggedInCredentials';
import { UserRole } from '../Enums/user-role';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/api-response';
import { userResponse } from '../Models/user';
import { ProfileUpdateRequest, ProfileUpdateResponse } from '../Models/profile';
import { AddressResponse } from '../Models/addressResponse';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private service: AccountService
  ) { }

  getToken(): string {
    return localStorage.getItem('kashmirServiceToken')
      ? JSON.parse(localStorage['kashmirServiceToken']).token
      : '';
  }

  bookService(id: any) {
    if (this.getToken()) {
      this.router.navigate(['/customer/bookservice/' + id]);
      return;
    } else {
      sessionStorage.setItem('serviceId', id);
      this.router.navigate(['/login']);
    }
  }

  getLocalObject(): LoggedInCredentials | null {
    return localStorage.getItem('kashmirServiceToken')
      ? JSON.parse(localStorage['kashmirServiceToken'])
      : null;
  }
  
  isUserAuthenticated(role: UserRole): boolean {
    if (
      this.getLocalObject() &&
      this.getLocalObject()?.token &&
      this.getLocalObject()?.userRole == role
    ) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  logOut() {
    environment
      .fireConfirmSwal('Are you sure you want to Logout?')
      .then((res) => {
        if (res.isConfirmed) {
          localStorage.removeItem('kashmirServiceToken');
          this.router.navigate(['/login']);
        }
      });
  }

  deleteItem<T>(url: string, id: string): Observable<ApiResponse<T>> {
    return this.httpClient.delete<ApiResponse<T>>(
      environment.apiBaseUrl + url + '/' + id
    );
  }

  isExists(url: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiBaseUrl}${url}`);
  }

  emitAddressEvent: EventEmitter<any> = new EventEmitter<any>();

  getUserData(): Observable<ApiResponse<userResponse>> {
    return this.httpClient.get<ApiResponse<userResponse>>(environment.apiBaseUrl + "users/user-details");
  }
  updateProfile(form: FormData): Observable<ApiResponse<ProfileUpdateResponse>> {
    return this.httpClient.put<ApiResponse<ProfileUpdateResponse>>(environment.apiBaseUrl + 'users', form);
  }

  getUserAddress(id: string): Observable<ApiResponse<AddressResponse[]>> {
    return this.httpClient.get<ApiResponse<AddressResponse[]>>(environment.apiBaseUrl + 'addresses/all/' + id);
  }
}
