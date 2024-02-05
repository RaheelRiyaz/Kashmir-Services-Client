import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostAddress } from '../Models/post-address';
import { ApiResponse } from '../Models/api-response';
import { AddressResponse } from '../Models/addressResponse';
import { Address } from '../Models/address';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private httpClient: HttpClient) {}
  getAddresses(): Observable<any> {
    return this.httpClient.get(environment.apiBaseUrl + 'addresses');
  }

  postAddress(model: PostAddress): Observable<any> {
    return this.httpClient.post(environment.apiBaseUrl + 'addresses', model,);
  }

  getAddressesByEntity(): Observable<ApiResponse<Address[]>> {
    return this.httpClient.get<ApiResponse<Address[]>>(environment.apiBaseUrl + 'addresses/all');
  }
  getAddressById(id:string):Observable<ApiResponse<Address>>{
    return this.httpClient.get<ApiResponse<Address>>(environment.apiBaseUrl+"addresses/"+id)
  }
}
