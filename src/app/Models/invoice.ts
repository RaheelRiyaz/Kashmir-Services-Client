export class BasicInvoice{
  id!:string;
  invoiceNo!:string;
}

export class InvoiceItems{
  invoiceId!:string;
  invoiceProduct!: InvoiceProduct[]
 // partIds!:string[];
}

export class InvoiceProduct{
  partId!:string;
  quantity!:number;
}
export class InvoiceBasicDetails{
  invoiceId!:string;

  invoiceDate!:string;

  invoiceNo!:string;

  jobNo!:string;

  callBookingId!:string;


  fullName!:string;

  phoneNumber!:string;


  serviceType!:string;

 charges!:number;

 freeServiceDistance !:number;

  perKilometerCharge!:number;

  totalDistance!:number;

  totalDistancePrice!:number;

 totalItemPrice!:number;

  grandTotal !:number;

   invoiceDetails!:InvoiceDetail[];

   isPaid!:boolean;
}

export class InvoiceDetail{
  id!:string;

  partId !:string;

  brandId !:string;

  partName!:string;

  partNo!:string;

  sellPrice!:number;

  serialNo !:string;

 brandName !:string;
}
