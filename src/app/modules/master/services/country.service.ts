import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/models/api-response';
import { Country } from '../../../core/models/master/country';
import { Dropdown } from '../../../core/models/master/dropdown';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private httpClient: HttpClient) {}

  // Get all countries dropdown
  getCountriesDropdown(): Observable<ApiResponse<Dropdown[]>> {
    return this.httpClient.get<ApiResponse<Dropdown[]>>(
      `${environment.apiBaseUrl}/Country/dropdown`
    );
  }

  // Get countries by region
  getCountriesByRegion(region: string): Observable<ApiResponse<Dropdown[]>> {
    return this.httpClient.get<ApiResponse<Dropdown[]>>(
      `${environment.apiBaseUrl}/Country/dropdown/region/${region}`
    );
  }
}