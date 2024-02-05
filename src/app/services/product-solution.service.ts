import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookService } from '../Models/bookService';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../Models/api-response';
import { Booking } from '../Models/booking';

@Injectable({
  providedIn: 'root',
})
export class ProductSolutionService {
  constructor(private httpClient: HttpClient) {}

  bookService(model: BookService): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + 'callBooking', model);
  }

  myBookings(): Observable<ApiResponse<Booking[]>> {
    return this.httpClient.get<ApiResponse<Booking[]>>(
      environment.apiBaseUrl + 'callbooking/my-bookings'
    );
  }
  cancelBooking(id: string): Observable<ApiResponse<any>> {
    return this.httpClient.get<ApiResponse<any>>(
      environment.apiBaseUrl + 'callbooking/booking-cancel/' + id
    );
  }
}
