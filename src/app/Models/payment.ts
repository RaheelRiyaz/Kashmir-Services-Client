export class AppOrderRequest
{
  callBookingId!:string;
}
export class AppOrderResponse {
  orderId!: string;
  amount!: number;
  name!: string;
  email!: string;
  contact!: string;
  address!: string;
  description!: string;
  filePath!: string;
}
