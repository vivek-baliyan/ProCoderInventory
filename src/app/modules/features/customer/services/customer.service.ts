import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ApiResponse } from '../../../../core/models/api-response';
import { Customer } from '../../../../core/models/customer/customer';
import { CreateCustomer } from '../../../../core/models/customer/create-customer';
import { UpdateCustomer } from '../../../../core/models/customer/update-customer';
import { CustomerListItem } from '../../../../core/models/customer/customer-list-item';
import { CustomerFilter } from '../../../../core/models/customer/customer-filter';
import { PaginatedResult } from '../../../../core/models/common/paginated-result';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) {}

  // Create Customer
  createCustomer(createCustomer: CreateCustomer): Observable<ApiResponse<boolean>> {
    return this.httpClient.post<ApiResponse<boolean>>(
      `${environment.apiBaseUrl}/Customer/create`,
      createCustomer
    );
  }

  // Update Customer
  updateCustomer(updateCustomer: UpdateCustomer): Observable<ApiResponse<boolean>> {
    return this.httpClient.put<ApiResponse<boolean>>(
      `${environment.apiBaseUrl}/Customer/update`,
      updateCustomer
    );
  }

  // Get Customer by ID
  getCustomerById(id: number): Observable<ApiResponse<Customer>> {
    return this.httpClient.get<ApiResponse<Customer>>(
      `${environment.apiBaseUrl}/Customer/getById/${id}`
    );
  }

  // Get All Customers with Pagination
  getAllCustomers(pageIndex: number, pageSize: number): Observable<ApiResponse<CustomerListItem[]>> {
    return this.httpClient.get<ApiResponse<CustomerListItem[]>>(
      `${environment.apiBaseUrl}/Customer/all/${pageIndex}/${pageSize}`
    );
  }

  // Filter Customers
  filterCustomers(filter: CustomerFilter): Observable<ApiResponse<PaginatedResult<CustomerListItem>>> {
    return this.httpClient.post<ApiResponse<PaginatedResult<CustomerListItem>>>(
      `${environment.apiBaseUrl}/Customer/filter`,
      filter
    );
  }

  // Delete Customer
  deleteCustomer(id: number): Observable<ApiResponse<boolean>> {
    return this.httpClient.delete<ApiResponse<boolean>>(
      `${environment.apiBaseUrl}/Customer/delete/${id}`
    );
  }

  // Toggle Customer Status
  toggleCustomerStatus(id: number): Observable<ApiResponse<boolean>> {
    return this.httpClient.patch<ApiResponse<boolean>>(
      `${environment.apiBaseUrl}/Customer/toggle-status/${id}`,
      {}
    );
  }

  // Search Customers (Simple search for dropdowns)
  searchCustomers(searchTerm: string): Observable<ApiResponse<PaginatedResult<CustomerListItem>>> {
    const filter: CustomerFilter = {
      searchTerm: searchTerm,
      pageIndex: 0,
      pageSize: 20
    };
    return this.filterCustomers(filter);
  }

  // Get Customer Dropdown Options
  getCustomerDropdown(): Observable<ApiResponse<{id: number, name: string}[]>> {
    return this.httpClient.get<ApiResponse<{id: number, name: string}[]>>(
      `${environment.apiBaseUrl}/Customer/dropdown`
    );
  }
}