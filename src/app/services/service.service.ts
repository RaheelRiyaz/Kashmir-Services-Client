import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductSolutionResponse } from '../Models/ProductSolutionResponse';
import { ApiResponse } from '../Models/api-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private httpClient: HttpClient) {}


  getServicesByPage(pageNo:number,pageSize:number):Observable<ApiResponse<ProductSolutionResponse[]>> {
    return this.httpClient.get<ApiResponse<ProductSolutionResponse[]>>(
      environment.apiBaseUrl + `ServiceType/pages?pageNo=${pageNo}&pageSize=${pageSize}`
    );
  }
  getServices():Observable<ApiResponse<ProductSolutionResponse[]>> {
    return this.httpClient.get<ApiResponse<ProductSolutionResponse[]>>(
      environment.apiBaseUrl + `ServiceType`
    );
  }

  getServicesByCategoryId(id: any) {
    return this.httpClient.get<ApiResponse<ProductSolutionResponse[]>>(
      environment.apiBaseUrl + 'productsolutions/category/' + id
    );
  }

  addService(model: any) {
    return this.httpClient.post<any>(
      environment.apiBaseUrl + 'serviceType',
      model
    );
  }
  deleteService(id: string) {
    return this.httpClient.delete<ApiResponse<number>>(
      environment.apiBaseUrl + 'productsolutions/' + id
    );
  }
  getById(id: string) {
    return this.httpClient.get<any>(
      environment.apiBaseUrl + 'serviceType/' + id
    );
  }
  updateService(model: ProductSolutionResponse) {
    return this.httpClient.put<any>(
      environment.apiBaseUrl + 'serviceType',
      model
    );
  }
  postAdmin(model: any) {
    return this.httpClient.post<any>(
      environment.apiBaseUrl + 'auth/admin-signup',
      model
    );
  }
  getManagers() {
    return this.httpClient.get<any>(environment.apiBaseUrl + 'users/managers');
  }
  getCategories() {
    return this.httpClient.get<any>(environment.apiBaseUrl + 'Category');
  }
  getProductSolutionsByPages(pageNo: number, pageSize: number) {
    return this.httpClient.get<any>(
      environment.apiBaseUrl +
        `productsolutions/pages?pageNo=${pageNo}&pageSize=${pageSize}`
    );
  }
  checkName(name: string) {
    return this.httpClient.get<boolean>(
      environment.apiBaseUrl + `productsolutions/check-name/${name}`
    );
  }
}
