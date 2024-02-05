import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/Enums/user-role';
import { ForgetPassword } from 'src/app/Models/forget-password';
import { AccountService } from 'src/app/services/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private service: AccountService, private router: Router) { }
  changePasswordModel: ForgetPassword = new ForgetPassword();
  key = '';


  ngOnInit(): void {
    let item = JSON.parse(localStorage["kashmirServiceToken"])
    this.key = item.Token
  }

  changePassword() {
    this.service.changePass(this.changePasswordModel).subscribe(
      (response) => {
        if (response.isSuccess) {
          environment.fireSuccessSwal(response.message);
          let userRole:UserRole = localStorage.getItem('kashmirServiceToken') ? JSON.parse(localStorage['kashmirServiceToken']).userRole : '';
          console.log(userRole)
          switch (userRole) {
            case UserRole.admin:
              this.router.navigate(['admin/dashboard']);
              break;
            case UserRole.manager:
              this.router.navigate(['manager/bookings']);
              break;
            case UserRole.serviceEngineer:
              this.router.navigate(['engineer/jobroles']);
              break;
            case UserRole.customer:
              this.router.navigate(['customer/bookings']);
              break;
          }
        }
      },
      errorResponse => {
        environment.fireErrorSwal(errorResponse.error.message)
      }
    )
  }

}

