import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckBox } from '@syncfusion/ej2/buttons';
import { Brand } from 'src/app/Models/get-brand';
import { InvoiceBasicDetails, InvoiceItems, InvoiceProduct } from 'src/app/Models/invoice';
import { Part } from 'src/app/Models/parts';
import { BaseService } from 'src/app/services/base.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  id='';
  parts:Part[]=[];
  brands:Brand[]=[];
  items: InvoiceProduct[]=[];
  callBookingId!:string;
  invoiceBasicDetails!:InvoiceBasicDetails
  isDisable=true;
  myEnterValue=''
  constructor(private service: BaseService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (response) => {
        this.id=response['id'];
        this.callBookingId=response['callBookingId']
      },
    });
    this.getAllParts();
    this.getAllBrands();
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

enableChk(chkBox:any){
  let chk= chkBox as CheckBox;
  // if(chk.checked )
  chk.disabled=false;
}
  generateInvoice(){
  let invoiceItems= new InvoiceItems();
  invoiceItems.invoiceId= this.id;
  invoiceItems.invoiceProduct=this.items;
 console.log(invoiceItems)
    this.service.Post<InvoiceItems,number>(invoiceItems,'invoice/invoice-item/').subscribe({
      next: (response) => {
       let x = response.result;
      },
      error: (err) => {
        this.parts = [];

        console.log(err);
      },
    });
  }


 getAllParts(): void {
  this.service.Fetch<Part[]>('parts').subscribe({
    next: (response) => {
      this.parts = response.result;
      console.log(this.parts)
    },
    error(err) {
      console.log(err);
    },
  });
}

showAll(){
  this.getAllParts();
 }


 checkQuantity(availQuantity:number, enteredQuantity :string){
  var quant=Number(enteredQuantity)
  if(quant > availQuantity ){
    environment.fireErrorSwal("Qantity not available");
   
    return false;
  }
  else {
    this.myEnterValue=enteredQuantity;
    return true;}
 }

 addItems(chkBox:any, myEnterValue:any){
  let chk= chkBox as CheckBox
  let prod=new InvoiceProduct();
  if(chk.checked){
    prod.partId=chk.value;
    prod.quantity=myEnterValue;
    this.items.push(prod)
  }
  else{
    var index= this.items.findIndex(x=>x.partId ==chk.value);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
  }
  console.log(this.items)
 }



 getAllBrands(){
  this.service.Fetch<Brand[]>('brands').subscribe({
    next: (response) => {
      this.brands = response.result;
      console.log(this.parts)
    },
    error(err) {
      console.log(err);
    },
  });
 }

searchByPartNo(partNo:string){
  this.service.Fetch<Part[]>('parts/partNo/'+partNo).subscribe({
    next: (response) => {
      this.parts = response.result;
      console.log(this.parts)
    },
    error: (err) => {
      this.parts = [];

      console.log(err);
    },
  });
}


filterByBrand(brandId: string) {
  this.service
    .Fetch<Part[]>(
      `parts/brand/${brandId}`
    )
    .subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.parts = response.result;
        }
      },
      error: (err) => {
        environment.fireErrorSwal(err.error.message);
      },
    });
}
}
