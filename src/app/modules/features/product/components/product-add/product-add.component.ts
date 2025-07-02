import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { VisibilityStatuses } from '../../../../../core/enums/visibility-status.enum';
import { Sizes } from '../../../../../core/enums/sizes.enum';
import { Category } from '../../../../../core/models/category/category';
import { CategoryService } from '../../../category/services/category.service';
import { CategoryDropdown } from '../../../../../core/models/category/categoryDropdown';
import { CreateProduct } from '../../../../../core/models/product/create-product';

@Component({
  selector: 'app-product-add',
  standalone: false,
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent implements OnInit {
  categories: CategoryDropdown[] = []; // Array of categories

  productVariants: any[] = []; // Array of product variants

  addProductForm!: FormGroup;
  addProductVariantForm!: FormGroup;

  statusOptions = Object.entries(VisibilityStatuses).map(([key, value]) => ({
    label: key,
    value: value,
  }));

  sizeOptions = Object.entries(Sizes).map(([key, value]) => ({
    label: key,
    value: value,
  }));

  selectedSizesMap: { [key: string]: boolean } = {}; // Array of sizes (e.g., ['S', 'M', 'L', 'XL'])

  tags: string[] = []; // Array of tags

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.initializeForm();
  }

  initializeForm() {
    this.addProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      pageTitle: ['', Validators.required],
      urlIdentifier: ['', Validators.required],
      description: [''],
      oldPrice: [null],
      price: ['', Validators.required],
      coupon: [''],
      publishDate: [null],
      publishTime: [null],
      categoryId: [null, Validators.required],
      sku: ['', Validators.required],
      stockQuantity: ['', Validators.required],
      status: ['0'],
      sizes: [[]],
      tags: [[]],
    });
  }

  getCategories() {
    this.categoryService.getCategoriesForDropdown().subscribe((response) => {
      this.categories = response.data;
    });
  }

  get isNameValid() {
    const nameInput = this.addProductForm.controls['name'];
    return nameInput.invalid && (nameInput.dirty || nameInput.touched);
  }

  get isPageTitleValid() {
    const pageTitleInput = this.addProductForm.controls['pageTitle'];
    return (
      pageTitleInput.invalid && (pageTitleInput.dirty || pageTitleInput.touched)
    );
  }

  get isUrlIdentifierValid() {
    const urlIdentifierInput = this.addProductForm.controls['urlIdentifier'];
    return (
      urlIdentifierInput.invalid &&
      (urlIdentifierInput.dirty || urlIdentifierInput.touched)
    );
  }

  get isPriceValid() {
    const priceInput = this.addProductForm.controls['price'];
    return priceInput.invalid && (priceInput.dirty || priceInput.touched);
  }

  get isCategoryValid() {
    const categoryInput = this.addProductForm.controls['categoryId'];
    return (
      categoryInput.invalid && (categoryInput.dirty || categoryInput.touched)
    );
  }

  get isSkuValid() {
    const skuInput = this.addProductForm.controls['sku'];
    return skuInput.invalid && (skuInput.dirty || skuInput.touched);
  }

  get isStockQuantityValid() {
    const stockQuantityInput = this.addProductForm.controls['stockQuantity'];
    return (
      stockQuantityInput.invalid &&
      (stockQuantityInput.dirty || stockQuantityInput.touched)
    );
  }

  saveProduct() {
    if (this.addProductForm.valid) {
      const formData = this.addProductForm.value;
      console.log('Form Data:', formData);

      const createProduct: CreateProduct = {
        name: formData.name,
        pageTitle: formData.pageTitle,
        urlIdentifier: formData.urlIdentifier,
        description: formData.description,
        status: formData.status,
        oldPrice: formData.oldPrice,
        price: formData.price,
        coupon: formData.coupon,
        publishDate: formData.publishDate,
        publishTime: formData.publishTime,
        tags: this.tags,
        categoryId: formData.categoryId,
        sku: formData.sku,
        stockQuantity: formData.stockQuantity,
        variants: [],
        sizes: [],
      };

      this.productService.createProduct(createProduct).subscribe((response) => {
        console.log('Product created successfully:', response);

        this.addProductForm.reset();
      });
    } else {
      console.log('Form is invalid');
      this.addProductForm.markAllAsTouched();
    }
  }
}
