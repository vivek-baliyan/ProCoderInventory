import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { VisibilityStatuses } from '../../../../../core/enums/visibility-status.enum';
import { ProductType } from '../../../../../core/enums/product-type.enum';
import { ProductStatus } from '../../../../../core/enums/product-status.enum';
import { Sizes } from '../../../../../core/enums/sizes.enum';
import { Category } from '../../../../../core/models/category/category';
import { CategoryService } from '../../../category/services/category.service';
import { CategoryDropdown } from '../../../../../core/models/category/category-dropdown';
import { CreateProduct } from '../../../../../core/models/product/create-product';

@Component({
  selector: 'app-product-add',
  standalone: false,
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent implements OnInit {
  categories: CategoryDropdown[] = []; // Array of categories

  addProductForm!: FormGroup;

  productTypeOptions = Object.entries(ProductType)
    .filter(([key, value]) => typeof value === 'number')
    .map(([key, value]) => ({
      label: key,
      value: value as number,
    }));

  productStatusOptions = Object.entries(ProductStatus)
    .filter(([key, value]) => typeof value === 'number')
    .map(([key, value]) => ({
      label: key,
      value: value as number,
    }));

  visibilityStatusOptions = Object.entries(VisibilityStatuses).map(([key, value]) => ({
    label: key,
    value: value,
  }));

  sizeOptions = Object.entries(Sizes).map(([key, value]) => ({
    label: key,
    value: value,
  }));

  selectedCategories: number[] = [];
  tags: string[] = [];

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
      sku: [''],
      name: ['', Validators.required],
      description: [''],
      productType: [ProductType.SimpleProduct, Validators.required],
      status: [ProductStatus.Draft, Validators.required],
      isActive: [true],
      isTaxable: [false],
      trackInventory: [true],
      serialNumberTracking: [false],
      batchTracking: [false],
      itemGroupId: [null],
      brandId: [null],
      manufacturerPartNumber: [''],
      upc: [''],
      ean: [''],
      isbn: [''],
      sellingPrice: [null, [Validators.min(0)]],
      costPrice: [null, [Validators.min(0)]],
      salesAccountId: [null],
      purchaseAccountId: [null],
      inventoryAccountId: [null],
      categoryIds: [[]],
      tags: [[]],
      customFields: [''],
      
      // Additional Zoho Inventory inspired fields
      unitOfMeasurement: [''],
      hsnSacCode: [''],
      salesDescription: [''],
      purchaseDescription: [''],
      openingStock: [null, [Validators.min(0)]],
      openingStockValue: [null, [Validators.min(0)]],
      reorderLevel: [null, [Validators.min(0)]],
      preferredVendorId: [null],
      warehouseId: [null],
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

  get isSellingPriceValid() {
    const priceInput = this.addProductForm.controls['sellingPrice'];
    return priceInput.invalid && (priceInput.dirty || priceInput.touched);
  }

  get isCostPriceValid() {
    const priceInput = this.addProductForm.controls['costPrice'];
    return priceInput.invalid && (priceInput.dirty || priceInput.touched);
  }

  get isSkuValid() {
    const skuInput = this.addProductForm.controls['sku'];
    return skuInput.invalid && (skuInput.dirty || skuInput.touched);
  }

  onCategoryChange(categoryId: number, isChecked: boolean) {
    if (isChecked) {
      this.selectedCategories.push(categoryId);
    } else {
      const index = this.selectedCategories.indexOf(categoryId);
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
    this.addProductForm.patchValue({ categoryIds: this.selectedCategories });
  }

  onTagsChange(event: any) {
    const tagString = event.target.value;
    this.tags = tagString ? tagString.split(',').map((tag: string) => tag.trim()) : [];
    this.addProductForm.patchValue({ tags: this.tags });
  }

  saveProduct() {
    if (this.addProductForm.valid) {
      const formData = this.addProductForm.value;
      console.log('Form Data:', formData);

      const createProduct: CreateProduct = {
        sku: formData.sku || null,
        name: formData.name,
        description: formData.description || null,
        productType: formData.productType,
        status: formData.status,
        isActive: formData.isActive,
        isTaxable: formData.isTaxable,
        trackInventory: formData.trackInventory,
        serialNumberTracking: formData.serialNumberTracking,
        batchTracking: formData.batchTracking,
        itemGroupId: formData.itemGroupId,
        brandId: formData.brandId,
        manufacturerPartNumber: formData.manufacturerPartNumber || null,
        upc: formData.upc || null,
        ean: formData.ean || null,
        isbn: formData.isbn || null,
        sellingPrice: formData.sellingPrice,
        costPrice: formData.costPrice,
        salesAccountId: formData.salesAccountId,
        purchaseAccountId: formData.purchaseAccountId,
        inventoryAccountId: formData.inventoryAccountId,
        categoryIds: this.selectedCategories.length > 0 ? this.selectedCategories : null,
        tags: this.tags.length > 0 ? this.tags : null,
        customFields: formData.customFields || null,
        
        // Additional Zoho Inventory inspired fields
        unitOfMeasurement: formData.unitOfMeasurement || null,
        hsnSacCode: formData.hsnSacCode || null,
        salesDescription: formData.salesDescription || null,
        purchaseDescription: formData.purchaseDescription || null,
        openingStock: formData.openingStock,
        openingStockValue: formData.openingStockValue,
        reorderLevel: formData.reorderLevel,
        preferredVendorId: formData.preferredVendorId,
        warehouseId: formData.warehouseId,
      };

      this.productService.createProduct(createProduct).subscribe((response) => {
        console.log('Product created successfully:', response);
        this.addProductForm.reset();
        this.selectedCategories = [];
        this.tags = [];
      });
    } else {
      console.log('Form is invalid');
      this.addProductForm.markAllAsTouched();
    }
  }
}
