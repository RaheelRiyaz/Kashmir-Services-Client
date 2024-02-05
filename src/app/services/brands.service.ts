import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddBrand } from '../Models/add-brand';
import { ApiResponse } from '../Models/api-response';
import { Brand } from '../Models/get-brand';
import { Observable } from 'rxjs';
import { BrandResponse } from '../Models/brandResponse';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private httpClient: HttpClient) {}

  getAllBrands(): Observable<ApiResponse<Brand[]>> {
    return this.httpClient.get<ApiResponse<Brand[]>>(
      environment.apiBaseUrl + 'Brands'
    );
  }
  postBrand(model: AddBrand) {
    return this.httpClient.post<any>(environment.apiBaseUrl + 'Brands', model);
  }

  deleteBrand(id: string): Observable<ApiResponse<any>> {
    return this.httpClient.delete<ApiResponse<any>>(
      environment.apiBaseUrl + 'Brands/' + id
    );
  }

  getById(id: string): Observable<ApiResponse<BrandResponse>> {
    return this.httpClient.get<ApiResponse<BrandResponse>>(
      environment.apiBaseUrl + 'Brands/' + id
    );
  }
  updateBrand(model: any): Observable<ApiResponse<BrandResponse>> {
    return this.httpClient.put<ApiResponse<BrandResponse>>(
      environment.apiBaseUrl + 'Brands',
      model
    );
  }
  checkBrandName(name: string) {
    return this.httpClient.get<boolean>(
      environment.apiBaseUrl + `Brands/check-brandname/${name}`
    );
  }

  getBrandsByCategoryId(id: string): Observable<any> {
    return this.httpClient.get(
      environment.apiBaseUrl + 'brands/categoryId/' + id
    );
  }
}
