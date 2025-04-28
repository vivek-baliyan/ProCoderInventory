import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ApiResponse } from '../../../../core/models/api-response';
import { UpdateProfile } from '../../../../core/models/user/update-profile';
import { UpdateLoginDetails } from '../../../../core/models/user/update-login-details';
import { User } from '../../../../core/models/user/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpClient: HttpClient) {}

  getAccountByUserId(userId: string) {
    return this.httpClient.get<ApiResponse<User>>(
      `${environment.apiBaseUrl}/Account/getAccountByUserId/${userId}`
    );
  }

  updateProfile(updateProfile: UpdateProfile) {
    return this.httpClient.put<ApiResponse<boolean>>(
      `${environment.apiBaseUrl}/Account/updateProfile`,
      updateProfile
    );
  }

  updateLoginDetails(updateLoginDetails: UpdateLoginDetails) {
    return this.httpClient.put<ApiResponse<boolean>>(
      `${environment.apiBaseUrl}/Account/updateLoginDetails`,
      updateLoginDetails
    );
  }
}
