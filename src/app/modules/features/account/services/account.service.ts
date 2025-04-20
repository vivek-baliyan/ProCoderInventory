import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ApiResponse } from '../../../../core/models/apiResponse';
import { UserProfileDetails } from '../../../../core/models/userProfileDetails';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpClient: HttpClient) {}

  getAccountByUserId(userId: string) {
    return this.httpClient.get<ApiResponse<UserProfileDetails>>(
      `${environment.apiBaseUrl}/Account/getAccountByUserId/${userId}`
    );
  }
}
