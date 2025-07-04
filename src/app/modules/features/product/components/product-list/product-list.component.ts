import { Component, Input, OnInit } from '@angular/core';
import { ProductListItem } from '../../../../../core/models/product/product-list-item';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  @Input() products!: ProductListItem[]; // Array of products

  constructor() {}

  ngOnInit(): void {}
}
