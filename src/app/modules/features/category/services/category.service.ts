import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { CreateCategory } from '../../../../core/models/category/create-category';
import { ApiResponse } from '../../../../core/models/api-response';
import { Category } from '../../../../core/models/category/category';
import { CategoryDropdown } from '../../../../core/models/category/categoryDropdown';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  createCategory(category: CreateCategory) {
    return this.httpClient.post<ApiResponse<Category>>(
      `${environment.apiBaseUrl}/category`,
      category
    );
  }

  getCategoriesForDropdown() {
    return this.httpClient.get<ApiResponse<CategoryDropdown[]>>(
      `${environment.apiBaseUrl}/category/dropdown`
    );
  }
}
