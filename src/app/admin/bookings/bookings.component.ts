import { Component, OnInit } from '@angular/core';
import { AllBooking } from 'src/app/Models/allBooking';
import { JobSheet } from 'src/app/Models/jobSheet';
import { ManagerBooking } from 'src/app/Models/managerBooking';
import { User } from 'src/app/Models/user';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit {
  constructor(private baseService: BaseService) {}
  bookings: ManagerBooking[] = [];
  customerDetails:User=new User();
  ngOnInit(): void {
   this.getAllBookings();
  }


  getCustomerDetails(id: any): void {
    this.baseService.Find<User>('users/' + id).subscribe({
      next: (response) => {
        this.customerDetails=response.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllBookings(){
    this.baseService.Fetch<ManagerBooking[]>('callbooking/all-bookings').subscribe({
      next: (response) => {
        console.log(response);
        this.bookings = response.result;
      },
      error: (err) => {
        console.log(err);
      },
    });

  }

  searchByDate(dateTerm:string){
    console.log(dateTerm)
    this.baseService.Fetch<any>('callBooking/all-bookings/dateTerm?date='+dateTerm).subscribe({
      next: (response) => {
        this.bookings = response.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showAll(){
   this.getAllBookings();
  }
}
