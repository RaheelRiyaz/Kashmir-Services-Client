import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminSignup } from 'src/app/Models/admin-signup';
import { ServiceService } from 'src/app/services/service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css'],
})
export class AdminSignupComponent implements OnInit {
  signupModel: AdminSignup = new AdminSignup();
  errorMessage: string = '';
  constructor(private service: ServiceService, private Router: Router) {}

  ngOnInit(): void {}
  addAdmin() {
    this.service.postAdmin(this.signupModel).subscribe({
      next: (response) => {
        if (response.isSuccess) {
              environment.fireSuccessSwal(
                `${response.result.userRole} Added Successfully`
              );
              this.Router.navigate(['/admin']);
            }
            this.Router.navigate(['/admin']);
      },
      error: (errorResponse) => {
        environment.fireErrorSwal(errorResponse.error.message);
      },
    }
     );
  }
}
