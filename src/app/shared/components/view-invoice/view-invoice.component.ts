import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceBasicDetails } from 'src/app/Models/invoice';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css']
})
export class ViewInvoiceComponent implements OnInit {
  callBookingId!:string;
  invoiceBasicDetails!:InvoiceBasicDetails
  constructor(private activatedRoute:ActivatedRoute,private service: BaseService) { }

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
        console.log(this.invoiceBasicDetails)
      },
      error(err) {
        console.log(err);
      },
    });
  }

}
