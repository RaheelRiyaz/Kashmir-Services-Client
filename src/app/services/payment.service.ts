import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../Models/api-response';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppOrderResponse } from '../Models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) {}


  payInvoice(id: string): Observable<ApiResponse<AppOrderResponse>> {
    let invoice = {
      callBookingId: id,
    };
    return this.httpClient.post<ApiResponse<AppOrderResponse>>(
      environment.apiBaseUrl + 'Invoice/CreateOrder',
      invoice
    );
  }

CapturePaymentDetails(paymentOptions: any): Observable<ApiResponse<any>> {
  return this.httpClient.post<ApiResponse<any>>(
    environment.apiBaseUrl + 'Invoice/CapturePaymentDetails',
    paymentOptions
  );
}

}
