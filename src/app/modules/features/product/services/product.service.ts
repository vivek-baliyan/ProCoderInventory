import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ApiResponse } from '../../../../core/models/api-response';
import { CreateProduct } from '../../../../core/models/product/create-product';
import { UpdateProduct } from '../../../../core/models/product/update-product';
import { ProductListItem } from '../../../../core/models/product/product-list-item';
import { ProductFilter } from '../../../../core/models/product/product-filter';
import { Product } from '../../../../core/models/product/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  createProduct(createProduct: CreateProduct) {
    return this.httpClient.post<ApiResponse<boolean>>(
      `${environment.apiBaseUrl}/product/create`,
      createProduct
    );
  }

  searchProducts(filter: ProductFilter) {
    return this.httpClient.post<ApiResponse<ProductListItem[]>>(
      `${environment.apiBaseUrl}/product/filter`,
      filter
    );
  }

  getProductById(productId: number) {
    return this.httpClient.get<ApiResponse<Product>>(
      `${environment.apiBaseUrl}/product/getById/${productId}`
    );
  }

  updateProduct(updateProduct: UpdateProduct) {
    return this.httpClient.put<ApiResponse<boolean>>(
      `${environment.apiBaseUrl}/product/update`,
      updateProduct
    );
  }

  // Dropdown data API methods
  getBrands() {
    return this.httpClient.get<ApiResponse<{id: number, name: string}[]>>(
      `${environment.apiBaseUrl}/brand/list`
    );
  }

  getUnitsOfMeasure() {
    return this.httpClient.get<ApiResponse<{id: number, name: string}[]>>(
      `${environment.apiBaseUrl}/unit-of-measure/list`
    );
  }

  getSalesAccounts() {
    return this.httpClient.get<ApiResponse<{id: number, name: string}[]>>(
      `${environment.apiBaseUrl}/account/sales/list`
    );
  }

  getPurchaseAccounts() {
    return this.httpClient.get<ApiResponse<{id: number, name: string}[]>>(
      `${environment.apiBaseUrl}/account/purchase/list`
    );
  }

  getInventoryAccounts() {
    return this.httpClient.get<ApiResponse<{id: number, name: string}[]>>(
      `${environment.apiBaseUrl}/account/inventory/list`
    );
  }

  getVendors() {
    return this.httpClient.get<ApiResponse<{id: number, name: string}[]>>(
      `${environment.apiBaseUrl}/vendor/list`
    );
  }
}
