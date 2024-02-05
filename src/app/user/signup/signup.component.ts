import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Signup } from '../../Models/signup';
import { AccountService } from '../../services/account.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupModel: Signup = new Signup();
  hello: boolean = false;
  signupDiv: boolean = true;
  constructor(
    private service: AccountService,
    private Router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {}

  validators = {
    isUniqueUserName: false,
    isUniqueEmail: false,
    isUniquePhoneNumber: false,
  };

  checkIfExists(url: string, term: string) {
    this.sharedService.isExists(`auth/${url}/${term}`).subscribe({
      next: (response) => {
        // First Approach
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            if (key in this.validators) {
              this.validators[key as keyof typeof this.validators] =
                !response[key];
            }
          }
        }

        // Second Approach
        // switch (url) {
        //   case 'check-phonenumber':
        //     this.validators.isUniquePhoneNumber = !response["isUniquePhoneNumber"];
        //     break;
        //   case 'check-username':
        //     this.validators.isUniqueUserName = !response.isUniqueUserName;
        //     break;
        //   default:
        //     this.validators.isUniqueEmail = !response.isUniqueEmail;
        //     break;
        // }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  signup() {
    this.signupDiv = false;
    this.hello = true;
    this.signupModel.gender = parseInt(this.signupModel.gender.toString());
    this.service.Usersignup(this.signupModel).subscribe({
      next: (successResponse) => {
        if (successResponse.isSuccess) {
          environment.fireSuccessSwal(successResponse.message);
          this.Router.navigate(['/login']);
        }
      },
      error: (errorResponse) => {
        if (errorResponse.error.statusCode === HttpStatusCode.Conflict)
          environment.fireErrorSwal(errorResponse.error.message);
        this.hello = false;
        this.signupDiv = true;
      },
    });
  }
}
