import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../../core/models/product/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-view',
  standalone: false,
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css',
})
export class ProductViewComponent implements OnInit {
  product!: Product;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Access the resolved data
    this.product = this.route.snapshot.data['product'].data;

    console.log('Product data:', this.product);
  }
}
