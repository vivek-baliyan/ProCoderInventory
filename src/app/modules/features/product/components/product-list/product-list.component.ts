import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductListItem } from '../../../../../core/models/product/product-list-item';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  @Input() products: ProductListItem[] = [];
  @Input() loading = false;
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Input() pageSize = 10;
  @Input() totalItems = 0;

  @Output() pageChange = new EventEmitter<number>();
  @Output() editProduct = new EventEmitter<ProductListItem>();
  @Output() viewProduct = new EventEmitter<ProductListItem>();
  @Output() duplicateProduct = new EventEmitter<ProductListItem>();
  @Output() deleteProduct = new EventEmitter<ProductListItem>();

  Math = Math;

  constructor() {}

  ngOnInit(): void {}

  onImageError(event: any): void {
    event.target.src = 'assets/images/product/default-product.jpg';
  }

  onEditProduct(product: ProductListItem): void {
    this.editProduct.emit(product);
  }

  onViewProduct(product: ProductListItem): void {
    this.viewProduct.emit(product);
  }

  onDuplicateProduct(product: ProductListItem): void {
    this.duplicateProduct.emit(product);
  }

  onDeleteProduct(product: ProductListItem): void {
    this.deleteProduct.emit(product);
  }

  getStockStatus(product: ProductListItem): { status: string; class: string } {
    // Note: ProductListItem doesn't have stock fields, but we can use isActive as a proxy
    if (!product.isActive) {
      return { status: 'Inactive', class: 'bg-secondary' };
    }
    
    // In a real implementation, you'd check actual stock levels
    // For now, we'll use selling price as an indicator
    if (!product.sellingPrice) {
      return { status: 'No Price Set', class: 'bg-warning' };
    }
    
    return { status: 'Available', class: 'bg-success' };
  }

  getBusinessFlags(product: ProductListItem): string[] {
    const flags: string[] = [];
    // Note: ProductListItem doesn't have business flags, but we can infer from available data
    if (product.sellingPrice) flags.push('Saleable');
    if (product.costPrice) flags.push('Purchasable');
    return flags;
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  getPaginationPages(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    const start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(this.totalPages, start + maxVisible - 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }
}
