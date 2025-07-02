import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { CreateCategory } from '../../../../core/models/category/create-category';
import { ApiResponse } from '../../../../core/models/api-response';
import { Category } from '../../../../core/models/category/category';
import { CategoryDropdown } from '../../../../core/models/category/categoryDropdown';
import { CategoryListItem } from '../../../../core/models/category/category-list-item';
import { UpdateCategory } from '../../../../core/models/category/update-category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  createCategory(create: CreateCategory) {
    return this.httpClient.post<ApiResponse<boolean>>(
      `${environment.apiBaseUrl}/category/create`,
      create
    );
  }

  updateCategory(update: UpdateCategory) {
    return this.httpClient.put<ApiResponse<boolean>>(
      `${environment.apiBaseUrl}/category/update`,
      update
    );
  }

  getCategoriesForDropdown() {
    return this.httpClient.get<ApiResponse<CategoryDropdown[]>>(
      `${environment.apiBaseUrl}/category/dropdown`
    );
  }
  getCategories(pageIndex: number, pageSize: number) {
    return this.httpClient.get<ApiResponse<CategoryListItem[]>>(
      `${environment.apiBaseUrl}/category/all/${pageIndex}/${pageSize}`
    );
  }

  getCategoryById(id: number) {
    return this.httpClient.get<ApiResponse<Category>>(
      `${environment.apiBaseUrl}/category/getById/${id}`
    );
  }

  deleteCategory(id: string) {
    return this.httpClient.delete<ApiResponse<Category>>(
      `${environment.apiBaseUrl}/category/${id}`
    );
  }
}
