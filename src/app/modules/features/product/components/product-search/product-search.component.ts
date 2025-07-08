import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../../category/services/category.service';
import { ProductListItem } from '../../../../../core/models/product/product-list-item';
import { CategoryDropdown } from '../../../../../core/models/category/categoryDropdown';
import { filter } from 'rxjs';
import { ProductFilter } from '../../../../../core/models/product/product-filter';
import { Sizes } from '../../../../../core/enums/sizes.enum';

@Component({
  selector: 'app-product-search',
  standalone: false,
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.css',
})
export class ProductSearchComponent implements OnInit {
  showGridView: boolean = false;
  categories: any = [];

  filterCollapsed: any = {
    category: false,
    size: false,
    color: false,
    pricing: false,
    rating: false,
  };

  sizeOptions = Object.entries(Sizes).map(([key, value]) => ({
    label: key,
    value: value,
  }));

  products: ProductListItem[] = [];

  selectedCategory: number = 0;
  selectedSizes: string[] = [];
  selectedColors: string[] = [];
  selectedPriceRange: { min: number; max: number } = { min: 0, max: 0 };
  selectedRatings: number = 0;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }

  getCategories() {
    this.categoryService.getCategoriesForDropdown().subscribe({
      next: (response) => {
        response.data.forEach((category: CategoryDropdown) => {
          this.categories.push({
            name: category.name,
            isCollapsed: true,
            childCategories: response.data
              .filter((item: CategoryDropdown) => {
                return item.parentCategoryId === category.id;
              })
              .map((item: CategoryDropdown) => {
                return { name: item.name, id: item.id };
              }),
          });
        });
      },
    });
  }

  getProducts() {
    let filter: ProductFilter = {
      categoryIds: [],
      size: [],
      color: [],
      priceRange: {
        min: 0,
        max: 0,
      },
      rating: 0,
      pageIndex: 1,
      pageSize: 10,
    };

    return this.productService.searchProducts(filter).subscribe({
      next: (response) => {
        this.products = response.data;
        console.log(response);
      },
    });
  }

  onSizeSelection(size: Sizes) {
    const index = this.selectedSizes.indexOf(size);
    if (index > -1) {
      this.selectedSizes.splice(index, 1);
    } else {
      this.selectedSizes.push(size);
    }
  }

  toggleMenu(index: number) {
    this.categories.forEach((category: any, i: number) => {
      if (i !== index) {
        category.isCollapsed = true;
      }
    });
    this.categories[index].isCollapsed = !this.categories[index].isCollapsed;
  }
}
