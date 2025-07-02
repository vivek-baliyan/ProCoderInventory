import { Component, Input, OnInit } from '@angular/core';
import { ProductListItem } from '../../../../../core/models/product/product-list-item';

@Component({
  selector: 'app-product-grid',
  standalone: false,
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css',
})
export class ProductGridComponent implements OnInit {
  @Input() products!: ProductListItem[]; // Array of products

  ngOnInit(): void {}
}
