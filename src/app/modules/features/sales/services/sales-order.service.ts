import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ApiResponse } from '../../../../core/models/api-response';
import { SalesOrder } from '../../../../core/models/sales/sales-order';
import { CreateSalesOrder } from '../../../../core/models/sales/create-sales-order';
import { UpdateSalesOrder } from '../../../../core/models/sales/update-sales-order';
import { SalesOrderListItem } from '../../../../core/models/sales/sales-order-list-item';
import { SalesOrderFilter } from '../../../../core/models/sales/sales-order-filter';
import { PaginatedResult } from '../../../../core/models/common/paginated-result';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService {

  constructor(private httpClient: HttpClient) {}

  // Create Sales Order
  createSalesOrder(createSalesOrder: CreateSalesOrder): Observable<ApiResponse<boolean>> {
    return this.httpClient.post<ApiResponse<boolean>>(
      `${environment.apiBaseUrl}/SalesOrder/create`,
      createSalesOrder
    );
  }

  // Update Sales Order
  updateSalesOrder(updateSalesOrder: UpdateSalesOrder): Observable<ApiResponse<boolean>> {
    return this.httpClient.put<ApiResponse<boolean>>(
      `${environment.apiBaseUrl}/SalesOrder/update`,
      updateSalesOrder
    );
  }

  // Get Sales Order by ID
  getSalesOrderById(id: number): Observable<ApiResponse<SalesOrder>> {
    return this.httpClient.get<ApiResponse<SalesOrder>>(
      `${environment.apiBaseUrl}/SalesOrder/getById/${id}`
    );
  }

  // Get All Sales Orders with Pagination
  getAllSalesOrders(pageIndex: number, pageSize: number): Observable<ApiResponse<SalesOrderListItem[]>> {
    return this.httpClient.get<ApiResponse<SalesOrderListItem[]>>(
      `${environment.apiBaseUrl}/SalesOrder/all/${pageIndex}/${pageSize}`
    );
  }

  // Filter Sales Orders
  filterSalesOrders(filter: SalesOrderFilter): Observable<ApiResponse<PaginatedResult<SalesOrderListItem>>> {
    return this.httpClient.post<ApiResponse<PaginatedResult<SalesOrderListItem>>>(
      `${environment.apiBaseUrl}/SalesOrder/filter`,
      filter
    );
  }

  // Delete Sales Order
  deleteSalesOrder(id: number): Observable<ApiResponse<boolean>> {
    return this.httpClient.delete<ApiResponse<boolean>>(
      `${environment.apiBaseUrl}/SalesOrder/delete/${id}`
    );
  }

  // Update Sales Order Status
  updateSalesOrderStatus(id: number, status: 'DRAFT' | 'SENT' | 'CONFIRMED' | 'CANCELLED'): Observable<ApiResponse<boolean>> {
    return this.httpClient.patch<ApiResponse<boolean>>(
      `${environment.apiBaseUrl}/SalesOrder/update-status/${id}`,
      { status }
    );
  }

  // Generate Order Number
  generateOrderNumber(): Observable<ApiResponse<string>> {
    return this.httpClient.get<ApiResponse<string>>(
      `${environment.apiBaseUrl}/SalesOrder/generateOrderNumber`
    );
  }

  // Send Sales Order
  sendSalesOrder(id: number): Observable<ApiResponse<boolean>> {
    return this.httpClient.post<ApiResponse<boolean>>(
      `${environment.apiBaseUrl}/SalesOrder/send/${id}`,
      {}
    );
  }
}
