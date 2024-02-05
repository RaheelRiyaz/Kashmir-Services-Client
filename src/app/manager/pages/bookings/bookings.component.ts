import { Component, OnInit } from '@angular/core';
import { AssignCall } from 'src/app/Models/assignCall';
import { JobSheet } from 'src/app/Models/jobSheet';
import { ManagerBooking } from 'src/app/Models/managerBooking';
import { Engineer } from 'src/app/Models/user';
import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit {
    assingButton:boolean=true;
  constructor(private service: BaseService) {}
  bookings: ManagerBooking[] = [];
  engineers: Engineer[] = [];
  callAssign: AssignCall = new AssignCall();
  jobsheets: JobSheet[] = [];
  ngOnInit(): void {
 this.getAllBookings();
  }

  getAllBookings(){
    this.service.Fetch<any>('manager/manager-bookings').subscribe({
      next: (response) => {
        this.bookings = response.result;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.service.Fetch<any>('manager/all-engineers/managerId').subscribe({
      next: (response) => {
        this.engineers = response.result;
        console.log(response);
      },
    });
  }

  searchByDate(dateTerm:string){
    console.log(dateTerm)
    this.service.Fetch<any>('manager/manager-bookings/dateTerm?date='+dateTerm).subscribe({
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

  reassignButtonChange(){
    this.assingButton=false;
  }

  assignCall(id: any, e: any) {
    this.callAssign.callBookingId = id;
    this.callAssign.engineerId = e.target.value;
    environment
      .fireConfirmSwal(
        'Are you sure you want to assign this call to this engineer'
      )
      .then((res) => {
        if (res.isConfirmed) {
          console.log(this.callAssign);
          this.service.Post<AssignCall, any>(this.callAssign,"manager/call-assign-engineer").subscribe({
            next: (response) => {
              console.log(response);
              if (response.isSuccess) {
                environment.fireSuccessSwal(response.message)
              } else {
                environment.fireErrorSwal(response.message);
              }
            },
            error: (err) => {
              environment.fireErrorSwal(err.error.message);
            },
          });
        }
      });
  }



}
