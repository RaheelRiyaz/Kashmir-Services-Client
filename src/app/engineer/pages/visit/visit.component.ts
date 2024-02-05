import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicInvoice } from 'src/app/Models/invoice';
import { Visit } from 'src/app/Models/visit';
import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.css'],
})
export class VisitComponent implements OnInit {
  constructor(
    private service: BaseService,
    private activatedRoute: ActivatedRoute,
    private route:Router
  ) {}
  assignEngineerId='';
  callStatus="";
  callBookingId="";
  totalDistance=0;
  invoiceId="";
  visitReport: Visit = new Visit();
  visits:Visit[] =[];
  basicInvoice!:BasicInvoice;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.assignEngineerId=response['id'];
        this.callStatus=response['callStatus'];
        this.callBookingId=response['callBookingId'];
        this.visitReport.assingedEngineerId = response['id'];
      },
    });
    this.getAllVisits();
    this.getInvoice();
  }



 getAllVisits(): void {
  this.service.Fetch<Visit[]>('visit/engineer-assingment-id/'+  this.assignEngineerId).subscribe({
    next: (response) => {
      this.visits = response.result;
      for(let visit of response.result){
        this.totalDistance+=visit.totalDistance;
      }
    },
    error(err) {
      console.log(err);
    },
  });
}

getInvoice(){
  this.service.Fetch<BasicInvoice>('invoice/'+  this.callBookingId).subscribe({
    next: (response) => {
      this.basicInvoice = response.result;
    },
    error(err) {
      // environment.fireErrorSwal(err.error.message)
    },
  });
}


deleteVisit(id:string){

 environment.fireConfirmSwal('Are you sure you want to delete visit!').then(result=>{
  if(result.isConfirmed){
    this.service.Delete<string>('visit/'+  id).subscribe({
      next: (response) => {
        this.getAllVisits();
        if(response.isSuccess){
          environment.fireSuccessSwal(response.message);
        }
      },
      error(err) {
        environment.fireErrorSwal(err.error.message);
      },
    });
  }

 })

}
submitCode(code:string)
{
  environment.fireConfirmSwal('Are you sure you want to close!').then(result=>{
    if(result.isConfirmed){

      this.service.Fetch<string>(`engineer/callstatus?assignedEngineerId=${ this.visitReport.assingedEngineerId}&code=${code}&callBookingId=${this.callBookingId}`).subscribe({
        next: (response) => {
           environment.fireSuccessSwal(response.message)
        },
        error(err) {
          console.log(err);
        },
      });
    }

   })
}


closeCall(assignedEngineerId:string){
  environment.fireConfirmSwal('Are you sure you want to close!').then(result=>{
    if(result.isConfirmed){

      this.service.Fetch<string>('engineer/callstatus?assignedEngineerId=' + assignedEngineerId).subscribe({
        next: (response) => {
           environment.fireSuccessSwal(response.message)
        },
        error(err) {
          console.log(err);
        },
      });
    }

   })
 }

 generateInvoice(){
  this.service.Fetch<string>(`invoice/add-invoice/${this.callBookingId}/${this.totalDistance}`).subscribe({
    next: (response) => {
      this.invoiceId= response.result
    },
    error(err) {
      console.log(err);
    },
  });
 }


getEnteringDate(val: string){

  let currentDate=new Date().getDate();
  let enterDate=new Date(val).getDate();
  if(enterDate < currentDate){
    environment.fireErrorSwal("Date must be greater than or equal to current date")
  }
 else
  this.visitReport.visitDate = val;
}

  getEnteringTime(val: string): void {
    this.visitReport.timeIn = val + ':00';
  }
  getClosingTime(val: string): void {
    this.visitReport.timeOut = val + ':00';
  }

  submitReport(): void {
    this.service.Post<Visit, any>(this.visitReport, 'visit').subscribe({
      next: (response) => {
        if (response.isSuccess) {
          environment.fireSuccessSwal(response.result);
        } else {
          environment.fireSuccessSwal(response.result);
        }
        this.getAllVisits();
      },
      error: (err) => {
        environment.fireErrorSwal(err.error.message);
      },
    });
  }
}
