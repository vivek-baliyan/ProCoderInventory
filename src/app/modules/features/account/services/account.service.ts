import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpClient: HttpClient) {}

  getAccountByUserId(userId: string) {
    return this.httpClient.get(
      `${environment.apiBaseUrl}/api/Account/getAccountByUserId/${userId}`
    );
  }
}
