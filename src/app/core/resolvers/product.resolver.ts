import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { Product } from '../models/product/product';
import { ProductService } from '../../modules/features/product/services/product.service';

export const productResolver: ResolveFn<ApiResponse<Product>> = (
  route,
  state
) => {
  const productService = inject(ProductService);
  const router = inject(Router);
  const productId = Number(route.paramMap.get('id'));

  return productService.getProductById(productId).pipe(
    catchError((error) => {
      console.error('Error loading product:', error);
      router.navigate(['/app/products/list']); // Redirect on error
      return EMPTY; // Or return of(null) if you want to proceed with navigation
    })
  );
};
