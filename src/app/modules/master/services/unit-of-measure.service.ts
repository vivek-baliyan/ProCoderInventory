import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../../core/models/api-response';
import { Dropdown } from '../../../core/models/master/dropdown';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UnitOfMeasureService {
  constructor(private httpClient: HttpClient) {}

  getUnitsDropdown(unitType: number = 0) {
    let params = new HttpParams();
    if (unitType) {
      params = params.set('unitType', unitType.toString());
    }

    return this.httpClient.get<ApiResponse<Dropdown[]>>(
      `${environment.apiBaseUrl}/UnitOfMeasure/dropdown`,
      { params }
    );
  }
}
