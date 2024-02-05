import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Signup } from '../Models/signup';
import { Login } from '../Models/login';
import { Forget } from '../Models/forget';
import { ResetPassword } from '../Models/reset-password';
import { environment } from 'src/environments/environment';
import { ShowCustomer } from '../Models/show-customer';
import { Observable } from 'rxjs';
import { ShowEmp } from '../Models/show-emp';
import { ContactResponse } from '../Models/contact-response';
import { AddContact } from '../Models/add-contact';
import { ForgetPassword } from '../Models/forget-password';
import { ApiResponse } from '../Models/api-response';
import { LoginResponse } from '../Models/login-response';
import { CustomerResponse } from '../Models/customer-response';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpClient: HttpClient) {}
  Usersignup(model: Signup) {
    var header = new HttpHeaders().append('clientUrl', 'http://localhost:4200');
    return this.httpClient.post<any>(
      environment.apiBaseUrl + 'Auth/signup',
      model,
      { headers: header }
    );
  }
  userLogin(model: Login) {
    return this.httpClient.post<ApiResponse<LoginResponse>>(
      environment.apiBaseUrl + 'Auth/Login',
      model
    );
  }
  sendEmail(model: Forget) {
    var header = new HttpHeaders().append('clientUrl', 'http://localhost:4200');
    return this.httpClient.post<any>(
      environment.apiBaseUrl + 'Auth/forgotPassword',
      model,
      { headers: header }
    );
  }
  resetPassword(model: ResetPassword) {
    return this.httpClient.post<any>(
      environment.apiBaseUrl + 'Auth/resetPassword?token=',
      model
    );
  }

  verifyEmail(key: string) {
    return this.httpClient.get<any>(
      environment.apiBaseUrl + 'auth/verifyemail?token=' + key
    );
  }

  checkUser(name: string) {
    return this.httpClient.get<any>(
      environment.apiBaseUrl + `auth/check-username/${name}`
    );
  }
  checkEmail(email: string) {
    return this.httpClient.get<any>(
      environment.apiBaseUrl + `auth/check-email/${email}`
    );
  }
  checkPhone(phoneNo: string) {
    return this.httpClient.get<any>(
      environment.apiBaseUrl + `auth/check-phonenumber/${phoneNo}`
    );
  }
  getCustomers(model: ShowCustomer):Observable<ApiResponse<CustomerResponse[]>> {
    return this.httpClient.get<ApiResponse<CustomerResponse[]>>(
      environment.apiBaseUrl +
        `users?searchTerm=${model.searchTerm}&status=${model.status}&roles=${model.roles}`
    );
  }
  getEmployees(model: ShowEmp):Observable<ApiResponse<CustomerResponse[]>> {
    return this.httpClient.get<ApiResponse<CustomerResponse[]>>(
      environment.apiBaseUrl +
        `users?searchTerm=${model.searchTerm}&status=${model.status}&roles=${model.roles}`
    );
  }
  addContact(model: AddContact): Observable<ContactResponse> {
    return this.httpClient.post<ContactResponse>(
      environment.apiBaseUrl + 'Contacts',
      model
    );
  }
  getContacts() {
    return this.httpClient.get<ApiResponse<ContactResponse[]>>(
      environment.apiBaseUrl + 'Contacts'
    );
  }
  getContactById(id: string) {
    return this.httpClient.get<ContactResponse>(
      environment.apiBaseUrl + `Contacts/${id}`
    );
  }
  deleteContact(id: string) {
    return this.httpClient.delete<ApiResponse<ContactResponse>>(environment.apiBaseUrl + `Contacts/${id}`);
  }
  changePass(model: ForgetPassword) {
    return this.httpClient.post<ApiResponse<string>>(
      environment.apiBaseUrl + 'auth/changePassword',
      model
    );
  }
}
