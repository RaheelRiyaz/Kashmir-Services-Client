import { Component, OnInit } from '@angular/core';
import { EngineerCallAssign } from 'src/app/Models/engineerCallBook';
import { JobSheet } from 'src/app/Models/jobSheet';
import { LoggedInCredentials } from 'src/app/Models/loggedInCredentials';
import { User } from 'src/app/Models/user';
import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jobsheet',
  templateUrl: './jobsheet.component.html',
  styleUrls: ['./jobsheet.component.css'],
})
export class JobsheetComponent implements OnInit {
  constructor(private service: BaseService) {}
  jobSheets: JobSheet[] = [];
  bookCall: EngineerCallAssign = new EngineerCallAssign();
  customerDetails:User=new User();
  id!:LoggedInCredentials;
  ngOnInit(): void {
    this.getAllJobShets();
  }
  getCustomerDetails(id: any): void {
    this.service.Find<User>('users/' + id).subscribe({
      next: (response) => {
        this.customerDetails=response.result;
        console.log(this.customerDetails)
        console.log(response)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  async book(assignedEngineerId: any, callBookingId: any) {
    const { value: formValues } = await Swal.fire({
      title: 'Visiting Date',
      html: `
        <input id="swal-input1" class="swal2-input" type="date"  >
        <textarea id="swal-input2" class="swal2-textarea" rows="4" placeholder="Write your remarks here..."></textarea>
      `,
      focusConfirm: false,
      preConfirm: () => {
        let dateControl =document.getElementById('swal-input1') as HTMLInputElement;
        let currentDate=new Date().getDate();
        let enterDate=new Date(dateControl.value).getDate();
      
        if(enterDate < currentDate){
          environment.fireErrorSwal("Date must be greater than or equal to current date")
          return false;
        }
    
        return [
         (document.getElementById('swal-input1') as HTMLInputElement).value,
          //  dateControl.value,
          (document.getElementById('swal-input2') as HTMLTextAreaElement).value,
        ];
      },
    });

    if (formValues) {
      this.bookCall.assignedEngineerId = assignedEngineerId;
      this.bookCall.callBookingId = callBookingId;
      this.bookCall.expectedDate = formValues[0];
      this.bookCall.remarks = formValues[1];
      this.service
        .Post<EngineerCallAssign, any>(
          this.bookCall,
          'engineer/schedule/booking'
        )
        .subscribe({
          next: (response) => {
            if (response.isSuccess) {
              environment.fireSuccessSwal(response.result);
            } else {
              environment.fireErrorSwal(response.result);
            }
          },
          error: (err) => {
            environment.fireErrorSwal(err.message);
          },
        });
    }
  }
  getAllJobShets(): void {
    this.service.Fetch<JobSheet[]>('engineer/my-jobsheet').subscribe({
      next: (response) => {
        this.jobSheets = response.result;
        console.log(response);
      },
      error(err) {
        console.log(err);
      },
    });
  }
  searchByJobNo(val: string) {
    this.service
      .Fetch<JobSheet>(`engineer/jobsheet/${Number(val)}`)
      .subscribe({
        next: (response) => {
          console.log(response);

          if (response.isSuccess) {
            this.jobSheets = [response.result];
          }
        },
        error: (err) => {
          environment.fireErrorSwal(err.statusText);
        },
      });
  }

  getAll(val: string) {
    if (val.length === 0) {
      this.getAllJobShets();
    }
  }

  filterByStatus(val: string) {
    this.service
      .Fetch<JobSheet[]>(
        `engineer/jobsheet/callstatus?callstatus=${Number(val)}`
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          if (response.isSuccess&&response.result.length>0) {
            this.jobSheets = response.result;
          }
          else{
            environment.fireErrorSwal(response.message)
          }
        },
        error: (err) => {
          environment.fireErrorSwal(err.statusText);
        },
      });
  }

  // closeCall(assignedEngineerId:string){
  //   environment.fireConfirmSwal('Are you sure you want to close!').then(result=>{
  //     if(result.isConfirmed){

  //       this.service.Fetch<string>('engineer/callstatus?assignedEngineerId=' + assignedEngineerId).subscribe({
  //         next: (response) => {
  //            environment.fireSuccessSwal(response.message)
  //         },
  //         error(err) {
  //           console.log(err);
  //         },
  //       });
  //     }

  //    })
  //  }
}
