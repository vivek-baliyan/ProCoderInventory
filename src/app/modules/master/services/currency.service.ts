import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/models/api-response';
import { Dropdown } from '../../../core/models/master/dropdown';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private httpClient: HttpClient) {}

  // Get all currencies dropdown
  getCurrenciesDropdown(): Observable<ApiResponse<Dropdown[]>> {
    return this.httpClient.get<ApiResponse<Dropdown[]>>(
      `${environment.apiBaseUrl}/Currency/dropdown`
    );
  }
}