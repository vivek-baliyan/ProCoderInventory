import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../core/models/api-response';
import { Dropdown } from '../../../core/models/master/dropdown';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private httpClient: HttpClient) {}

  // Get states by country
  getStatesDropdown(countryId?: number): Observable<ApiResponse<Dropdown[]>> {
    let params = new HttpParams();
    if (countryId) {
      params = params.set('countryId', countryId.toString());
    }

    return this.httpClient.get<ApiResponse<Dropdown[]>>(
      `${environment.apiBaseUrl}/State/dropdown`,
      { params }
    );
  }
}