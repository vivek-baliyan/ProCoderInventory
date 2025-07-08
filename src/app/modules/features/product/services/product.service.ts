import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ApiResponse } from '../../../../core/models/api-response';
import { CreateProduct } from '../../../../core/models/product/create-product';
import { ProductListItem } from '../../../../core/models/product/product-list-item';
import { ProductFilter } from '../../../../core/models/product/product-filter';

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
      `${environment.apiBaseUrl}/product/search`,
      filter
    );
  }
}
