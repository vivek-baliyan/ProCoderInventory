import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductListItem } from '../../../../../core/models/product/product-list-item';
import { ProductFilter } from '../../../../../core/models/product/product-filter';

@Component({
  selector: 'app-product-search',
  standalone: false,
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.css',
})
export class ProductSearchComponent implements OnInit {
  showGridView: boolean = false;
  products: ProductListItem[] = [];

  searchTerm: string = '';
  selectedTagIds: number[] = [];
  selectedPriceRange: { min: number; max: number } = { min: 0, max: 0 };
  selectedStatus: number | null = null;
  selectedActiveStatus: boolean | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    let filter: ProductFilter = {
      searchTerm: this.searchTerm || undefined,
      minPrice: this.selectedPriceRange.min || undefined,
      maxPrice: this.selectedPriceRange.max || undefined,
      status: this.selectedStatus || undefined,
      isActive: this.selectedActiveStatus || undefined,
      tagIds: this.selectedTagIds.length > 0 ? this.selectedTagIds : undefined,
      pageIndex: 1,
      pageSize: 10,
      sortDescending: false,
    };

    return this.productService.searchProducts(filter).subscribe({
      next: (response) => {
        this.products = response.data;
        console.log(response);
      },
    });
  }

  onTagSelection(tagId: number) {
    const index = this.selectedTagIds.indexOf(tagId);
    if (index > -1) {
      this.selectedTagIds.splice(index, 1);
    } else {
      this.selectedTagIds.push(tagId);
    }
    this.getProducts();
  }

  onStatusChange() {
    this.getProducts();
  }

  onActiveStatusChange() {
    this.getProducts();
  }

  onSearchChange() {
    this.getProducts();
  }

  onPriceRangeChange() {
    this.getProducts();
  }

  resetFilters() {
    this.searchTerm = '';
    this.selectedTagIds = [];
    this.selectedPriceRange = { min: 0, max: 0 };
    this.selectedStatus = null;
    this.selectedActiveStatus = null;
    this.getProducts();
  }
}
