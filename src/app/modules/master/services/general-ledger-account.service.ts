import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../../core/models/api-response';
import { Dropdown } from '../../../core/models/master/dropdown';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeneralLedgerAccountService {
  constructor(private httpClient: HttpClient) {}

  getGLAccountsDropdown() {
    return this.httpClient.get<ApiResponse<Dropdown[]>>(
      `${environment.apiBaseUrl}/GLAccount/dropdown`
    );
  }
}
