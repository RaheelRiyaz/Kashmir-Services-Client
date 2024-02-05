import { HttpStatusCode } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceBasicDetails } from 'src/app/Models/invoice';
import { AppOrderResponse } from 'src/app/Models/payment';
import { BaseService } from 'src/app/services/base.service';
import { PaymentService } from 'src/app/services/payment.service';
import { environment } from 'src/environments/environment';
declare var Razorpay: any;
@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css']
})
export class ViewInvoiceComponent implements OnInit {

  callBookingId!:string;
  invoiceBasicDetails!:InvoiceBasicDetails
  appOrderResponse!:AppOrderResponse;
  showLoader: boolean = true;
  // showPaidButton=true;


  constructor(private activatedRoute:ActivatedRoute,
    private service: BaseService,
    private paymentService:PaymentService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.callBookingId=response['callBookingId']
      },
    });

    this.viewInvoice();
  }


  viewInvoice(){
    this.service.Fetch<InvoiceBasicDetails>('invoice/view-invoice/'+this.callBookingId).subscribe({
      next: (response) => {

        this.invoiceBasicDetails = response.result;
        // if(this.invoiceBasicDetails.isPaid)
        //   this.showPaidButton=false;
        console.log(this.invoiceBasicDetails)
      },
      error(err) {
        console.log(err);
      },
    });
  }



  options = {
    // May Get RazorPayKey from Backend api which is much safer
    key: environment.razorPayKey,
    amount:0,
    currency: 'INR',
    name: 'Kashmir Service',
    description:'',
    image:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bikatadventures.com%2FHome%2FItinerary%2Fkashmir-great-lakes-trek&psig=AOvVaw3MYSOgV1zj8lwD_Mk8kYfi&ust=1694954929506000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCMDsuqeVr4EDFQAAAAAdAAAAABAD',
    order_id:  '',

   "handler":function (response:any){
    var event= new CustomEvent("payment.success",{detail:response,bubbles:true,cancelable:true});
    window.dispatchEvent(event);
   },

    prefill: {
      //using the prefill parameter to auto-fill customer's contact information, especially their phone number
      name: '',
      email: '',
      contact: '',
    },
    notes: {
      address: '',
    },
    theme: {
      color: '#3399cc',
    },
  };
  payInvoice(){

    this.paymentService.payInvoice(this.callBookingId).subscribe({
      next: (response) => {
        this.showLoader = false;
       if(!response.isSuccess){
        if(response.statusCode === HttpStatusCode.AlreadyReported){
          environment.fireErrorSwal('Payment already done')
        }
        return;
       }
       this.appOrderResponse=response.result;
        this.options.amount=this.appOrderResponse.amount;
        this.options.description= this.appOrderResponse.description;
        this.options.order_id=this.appOrderResponse.orderId;

        this.options.prefill.name= this.appOrderResponse.name;
        this.options.prefill.email= this.appOrderResponse.email;
        this.options.prefill.contact= this.appOrderResponse.contact;

        this.options.notes.address=this.appOrderResponse.address;

       this.payNow();
      },
      error: (err) => {
        console.log(err);
        this.showLoader = false;
      },
    });
  }
  payNow() {
    let rzp1=new Razorpay(this.options);
    rzp1.open()
    rzp1.on('payment.error',function(response:any){
        alert("errrrrrr");
    })
  }


  @HostListener('window:payment.success',['$event'])
  onPaymentSuccess(response:any):void{
    let data=response.detail;
     let paymentOptions={
      razorpay_payment_id : data.razorpay_payment_id,
      razorpay_order_id:   data.razorpay_order_id,
      razorpay_signature:  data.razorpay_signature
     }
     this.paymentService.CapturePaymentDetails(paymentOptions).subscribe(res=>{
      environment.fireSuccessSwal("Payment done Successfully")
     })
  }



}
