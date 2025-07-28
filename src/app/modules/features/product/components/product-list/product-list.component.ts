import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductListItem } from '../../../../../core/models/product/product-list-item';

export interface BulkAction {
  action: 'edit' | 'delete' | 'activate' | 'deactivate';
  products: ProductListItem[];
}

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
  @Output() toggleStatus = new EventEmitter<ProductListItem>();
  @Output() bulkAction = new EventEmitter<BulkAction>();
  @Output() sortChange = new EventEmitter<{column: string, direction: 'asc' | 'desc'}>();

  selectedProducts: number[] = [];
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
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

  onToggleStatus(product: ProductListItem): void {
    this.toggleStatus.emit(product);
  }

  getProductStatus(product: ProductListItem): { status: string; class: string } {
    if (!product.isActive) {
      return { status: 'Inactive', class: 'bg-secondary' };
    }
    
    switch (product.status) {
      case 0:
        return { status: 'Draft', class: 'bg-warning' };
      case 1:
        return { status: 'Active', class: 'bg-success' };
      case 2:
        return { status: 'Discontinued', class: 'bg-danger' };
      default:
        return { status: 'Unknown', class: 'bg-secondary' };
    }
  }

  getStockStatus(product: ProductListItem): { status: string; class: string } {
    if (!product.isActive) {
      return { status: 'Inactive', class: 'bg-secondary' };
    }
    
    if (!product.sellingPrice) {
      return { status: 'No Price Set', class: 'bg-warning' };
    }
    
    return { status: 'In Stock', class: 'bg-success' };
  }

  getBusinessFlags(product: ProductListItem): string[] {
    const flags: string[] = [];
    
    if (product.sellingPrice) flags.push('Saleable');
    if (product.costPrice) flags.push('Purchasable');
    if (product.sellingPrice && product.costPrice && product.sellingPrice > product.costPrice) {
      flags.push('Profitable');
    }
    if (!product.sellingPrice && !product.costPrice) flags.push('Draft');
    
    return flags;
  }

  getMarginPercentage(product: ProductListItem): number {
    if (!product.costPrice || !product.sellingPrice) return 0;
    return Math.round(((product.sellingPrice - product.costPrice) / product.costPrice) * 100);
  }

  getMarginClass(product: ProductListItem): string {
    const margin = this.getMarginPercentage(product);
    if (margin > 30) return 'text-success fw-bold';
    if (margin > 10) return 'text-primary fw-medium';
    if (margin > 0) return 'text-warning';
    return 'text-danger fw-bold';
  }

  // Selection methods
  isSelected(productId: number): boolean {
    return this.selectedProducts.includes(productId);
  }

  toggleSelection(productId: number): void {
    const index = this.selectedProducts.indexOf(productId);
    if (index > -1) {
      this.selectedProducts.splice(index, 1);
    } else {
      this.selectedProducts.push(productId);
    }
  }

  toggleSelectAll(): void {
    if (this.isAllSelected()) {
      this.selectedProducts = [];
    } else {
      this.selectedProducts = this.products.map(p => p.id);
    }
  }

  isAllSelected(): boolean {
    return this.products.length > 0 && this.selectedProducts.length === this.products.length;
  }

  isIndeterminate(): boolean {
    return this.selectedProducts.length > 0 && this.selectedProducts.length < this.products.length;
  }

  clearSelection(): void {
    this.selectedProducts = [];
  }

  // Bulk actions
  bulkEdit(): void {
    const selectedProductsData = this.products.filter(p => this.selectedProducts.includes(p.id));
    this.bulkAction.emit({ action: 'edit', products: selectedProductsData });
  }

  bulkDelete(): void {
    const selectedProductsData = this.products.filter(p => this.selectedProducts.includes(p.id));
    this.bulkAction.emit({ action: 'delete', products: selectedProductsData });
  }

  bulkActivate(): void {
    const selectedProductsData = this.products.filter(p => this.selectedProducts.includes(p.id));
    this.bulkAction.emit({ action: 'activate', products: selectedProductsData });
  }

  bulkDeactivate(): void {
    const selectedProductsData = this.products.filter(p => this.selectedProducts.includes(p.id));
    this.bulkAction.emit({ action: 'deactivate', products: selectedProductsData });
  }

  // Sorting
  onSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.sortChange.emit({ column: this.sortColumn, direction: this.sortDirection });
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
