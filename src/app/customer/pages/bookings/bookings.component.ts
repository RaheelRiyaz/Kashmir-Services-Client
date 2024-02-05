import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/Models/booking';
import { User } from 'src/app/Models/user';
import { BaseService } from 'src/app/services/base.service';
import { ProductSolutionService } from 'src/app/services/product-solution.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit {
  customerDetails:User=new User();

  constructor(
    private service: ProductSolutionService,
    private baseService: BaseService
  ) {}
  bookings: Booking[] = [];
  ngOnInit(): void {
    this.getBookings();
  }
  getBookings(): void {
    this.service.myBookings().subscribe({
      next: (response) => {
        this.bookings = response.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  cancelBooking(id: any): void {
    environment
      .fireConfirmSwal('Are you sure you want to cancel this booking?')
      .then((res) => {
        if (res.isConfirmed) {
          this.service.cancelBooking(id).subscribe({
            next: (response) => {
              if (response.isSuccess) {
                this.getBookings();
                environment.fireSuccessSwal(response.message);
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

  setReminder(id: string): void {
    this.baseService.Find<any>('callbooking/booking-reminder/' + id).subscribe({
      next: (response) => {
         environment.fireSuccessSwal(response.message)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
 
  async reschedule(assignedEngineerId: any) {
    const { value: formValues } = await Swal.fire({
      title: 'Reschedule Date',
      html: `
        <input id="swal-input1" class="swal2-input" type="date" >
        <textarea id="swal-input2" class="swal2-textarea" rows="4" placeholder="Write your remarks here..."></textarea>
      `,
      focusConfirm: false,
      preConfirm: () => {
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
          (document.getElementById('swal-input2') as HTMLTextAreaElement).value,
        ];
      },
    });
  
  }
}
