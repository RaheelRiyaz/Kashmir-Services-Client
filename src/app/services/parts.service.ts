import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/api-response';
import { Part } from '../Models/parts';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PartsService {
  constructor(private httpClient: HttpClient) {}

  getPartsByBrandId(id: string): Observable<ApiResponse<Part[]>> {
    return this.httpClient.get<ApiResponse<Part[]>>(
      environment.apiBaseUrl + 'parts/brand/' + id
    );
  }
}
