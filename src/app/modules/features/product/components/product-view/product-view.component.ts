import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../../core/models/product/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-view',
  standalone: false,
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css',
})
export class ProductViewComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    try {
      const resolvedData = this.route.snapshot.data['product'];
      
      if (resolvedData?.data) {
        this.product = resolvedData.data;
        this.loading = false;
      } else {
        this.error = 'Product not found';
        this.loading = false;
      }
    } catch (err) {
      this.error = 'Failed to load product data';
      this.loading = false;
      console.error('Error loading product:', err);
    }
  }

  onImageError(event: any): void {
    event.target.src = 'assets/images/product/default-product.jpg';
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
