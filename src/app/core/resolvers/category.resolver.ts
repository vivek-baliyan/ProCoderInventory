import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { EMPTY, Observable, catchError, of } from 'rxjs';
import { CategoryService } from '../../modules/features/category/services/category.service';
import { Category } from '../models/category/category';
import { ApiResponse } from '../models/api-response';

export const categoryResolver: ResolveFn<ApiResponse<Category>> = (
  route,
  state
) => {
  const categoryService = inject(CategoryService);
  const router = inject(Router);
  const categoryId = Number(route.paramMap.get('id'));

  return categoryService.getCategoryById(categoryId).pipe(
    catchError((error) => {
      console.error('Error loading category:', error);
      router.navigate(['/app/categories/list']); // Redirect on error
      return EMPTY; // Or return of(null) if you want to proceed with navigation
    })
  );
};
