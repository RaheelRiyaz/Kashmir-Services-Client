import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostAddress } from 'src/app/Models/post-address';
import { AddressService } from 'src/app/services/address.service';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-address',
  templateUrl: './post-address.component.html',
  styleUrls: ['./post-address.component.css'],
})
export class PostAddressComponent implements OnInit {
  constructor(
    private service: AddressService,
    private route: Router,
    private sharedService: SharedService
  ) {}
  postAddressModel: PostAddress = new PostAddress();
  successMessage!: string;
  errorMessage!: string;
  entityId!: string;

  ngOnInit(): void {
    this.sharedService.emitAddressEvent.subscribe({
      next: (response: any) => {
        this.postAddressModel.latitute = response.latitude;
        this.postAddressModel.longitute = response.longitude;
      },
    });
  }
  addAddress() {
    if (this.postAddressModel.latitute && this.postAddressModel.longitute) {
      this.service.postAddress(this.postAddressModel).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            const productId = sessionStorage.getItem('productSolutionId');
            if (productId) {
              sessionStorage.removeItem('productSolutionId');
              this.route.navigate(['/customer/bookservice/' + productId]);
            } else environment.fireSuccessSwal('Address added successfully');
          }
        },
        error: (err) => {
          environment.fireErrorSwal(
            'There is some issue please try after sometime'
          );
        },
      });
    } else {
      environment.fireErrorSwal('Please Select Your Location');
    }
  }
  ngOnDestroy() {
    sessionStorage.removeItem('productSolutionId');
  }
}
