import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ApiResponse } from '../../../../core/models/api-response';
import { UpdateProfile } from '../../../../core/models/user/update-profile';
import { UpdateLoginDetails } from '../../../../core/models/user/update-login-details';
import { User } from '../../../../core/models/user/user';
import { Organisation } from '../../../../core/models/user/organisation';

@Injectable({
  providedIn: 'root',
})
export class OrganisationService {
  constructor(private httpClient: HttpClient) {}

  createOrganisation(organisation: Organisation) {
    return this.httpClient.post<ApiResponse<Organisation>>(
      `${environment.apiBaseUrl}/Organisation/create`,
      organisation
    );
  }

  updateOrganisation(organisation: Organisation) {
    return this.httpClient.put<ApiResponse<Organisation>>(
      `${environment.apiBaseUrl}/Organisation/update`,
      organisation
    );
  }

  getUserOrganisation(userId: string) {
    return this.httpClient.get<ApiResponse<Organisation>>(
      `${environment.apiBaseUrl}/Organisation/${userId}`
    );
  }
}
