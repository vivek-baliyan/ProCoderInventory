import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../../category/services/category.service';
import { ProductListItem } from '../../../../../core/models/product/product-list-item';
import { CategoryDropdown } from '../../../../../core/models/category/categoryDropdown';

@Component({
  selector: 'app-product-search',
  standalone: false,
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.css',
})
export class ProductSearchComponent implements OnInit {
  showGridView: boolean = false;

  // categories: CategoryDropdown[] = [];
  childCategories: CategoryDropdown[] = [];

  categories: any = [
    {
      name: 'Game accessories',
      isOpen: false,
      items: [
        { name: 'PlayStation 4', link: '#' },
        { name: 'Oculus VR', link: '#' },
        { name: 'Remote', link: '#' },
        { name: 'Lighting Keyboard', link: '#' },
      ],
    },
    {
      name: 'Bags',
      isOpen: false,
      items: [
        { name: 'School Bags', link: '#' },
        { name: 'Traveling Bags', link: '#' },
      ],
    },
    {
      name: 'Flower Port',
      isOpen: false,
      items: [
        { name: 'Woodan Port', link: '#' },
        { name: 'Pattern Port', link: '#' },
      ],
    },
    {
      name: 'Watch',
      isOpen: false,
      items: [
        { name: 'Wall Clock', link: '#' },
        { name: 'Smart Watch', link: '#' },
        { name: 'Rado Watch', link: '#' },
        { name: 'Fasttrack Watch', link: '#' },
        { name: 'Noise Watch', link: '#' },
      ],
    },
    {
      name: 'Accessories',
      isOpen: false,
      items: [
        { name: 'Note Diaries', link: '#' },
        { name: 'Fold Diaries', link: '#' },
      ],
    },
  ];

  filterCollapsed: any = {
    category: false,
    size: false,
    color: false,
    pricing: false,
    rating: false,
  };
  products: ProductListItem[] = [];

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
        this.categories = response.data;
        this.childCategories = this.categories.filter(
          (category: any) => category.parentCategoryId !== 0
        );
      },
    });
  }

  getProducts() {
    return this.productService.getProducts(1, 10).subscribe({
      next: (response) => {
        this.products = response.data;
        console.log(response);
      },
    });
  }
}
