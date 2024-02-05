import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryRequest } from '../Models/category';
import { ApiResponse } from '../Models/api-response';
import { CategoryResponse } from '../Models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  constructor(private httpClient: HttpClient) {
  }

  getCategories(): Observable<ApiResponse<CategoryResponse[]>> {
    return this.httpClient.get<ApiResponse<CategoryResponse[]>>(
      environment.apiBaseUrl+ 'Category'
    );
  }
  deleteCategory(id: string) {
    return this.httpClient.delete<ApiResponse<CategoryResponse>>(
      environment.apiBaseUrl+ 'Category/' + id
    );
  }
  addCategory(formdata: FormData):Observable<ApiResponse<CategoryResponse>> {
    return this.httpClient.post<ApiResponse<CategoryResponse>>(
      environment.apiBaseUrl+ 'Category',
      formdata
    );
  }
  getCategoryById(id: string) {
    return this.httpClient.get<ApiResponse<CategoryResponse>>(
      environment.apiBaseUrl+ 'Category/' + id
    );
  }

  updateCategory(formData: FormData) {
    return this.httpClient.put<ApiResponse<CategoryResponse>>(
      environment.apiBaseUrl+ 'Category',
      formData
    );
  }

  checkCategory(categoryName: string) {
    return this.httpClient.get<boolean>(
      environment.apiBaseUrl+ `Category/check/${categoryName}`
    );
  }
}
