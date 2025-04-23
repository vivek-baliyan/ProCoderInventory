import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ApiResponse } from '../../../../core/models/api-response';
import { UserProfileDetails } from '../../../../core/models/user-profile-details';
import { UpdateProfile } from '../../../../core/models/update-profile';
import { UpdateProfileSettings } from '../../../../core/models/update-profile-settings';
import { UpdateLoginDetails } from '../../../../core/models/update-login-details';

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

  updateProfile(updateProfile: UpdateProfile) {
    return this.httpClient.put<ApiResponse<boolean>>(
      `${environment.apiBaseUrl}/Account/updateProfile`,
      updateProfile
    );
  }

  updateProfileSettings(profileSettings: UpdateProfileSettings) {
    return this.httpClient.put<ApiResponse<boolean>>(
      `${environment.apiBaseUrl}/Account/updateProfileSettings`,
      profileSettings
    );
  }

  updateLoginDetails(updateLoginDetails: UpdateLoginDetails) {
    return this.httpClient.put<ApiResponse<boolean>>(
      `${environment.apiBaseUrl}/Account/updateLoginDetails`,
      updateLoginDetails
    );
  }
}
