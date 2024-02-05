import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/Models/api-response';
import { Login } from 'src/app/Models/login';
import { LoginResponse } from 'src/app/Models/login-response';
import { UserRole } from 'src/app/Enums/user-role';
import { AccountService } from 'src/app/services/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginBtn: boolean = true;
  loadingBtn: boolean = false;
  loginModel: Login = new Login();
  responseModel: any;
  constructor(private service: AccountService, private Router: Router) {}

  ngOnInit(): void {}

  login() {
    this.loginBtn = false;
    this.loadingBtn = true;
    this.loginModel.rememberMe = true;

    this.service.userLogin(this.loginModel).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          localStorage.setItem(
            'kashmirServiceToken',
            JSON.stringify(response.result)
          );
          let serviceId = sessionStorage.getItem('serviceId');
          if (serviceId) {
            this.Router.navigate(['/customer/bookservice/' + serviceId]);
            return;
          }
          switch (response.result.userRole) {
            case UserRole.admin:
              this.Router.navigate(['/admin']);
              break;
            case UserRole.manager:
              this.Router.navigate(['/manager']);
              break;
            case UserRole.customer:
              this.Router.navigate(['/customer']);
              break;
            default:
              this.Router.navigate(['/engineer']);
              break;
          }
        }
      },
      error: (errorResponse) => {
        environment.fireErrorSwal(errorResponse.error.message);
        this.loadingBtn = false;
        this.loginBtn = true;
      },
    });
  }
  ngOnDestroy():void{
    sessionStorage.removeItem("serviceId")
  }
}
