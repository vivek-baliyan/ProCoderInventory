import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { NotificationService } from '../../../../../core/services/notification.service';
import { ProductType } from '../../../../../core/enums/product-type.enum';
import { ProductStatus } from '../../../../../core/enums/product-status.enum';
import { CreateProduct } from '../../../../../core/models/product/create-product';

@Component({
  selector: 'app-product-add',
  standalone: false,
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent implements OnInit {
  addProductForm!: FormGroup;
  uploadedImages: string[] = [];

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



  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.addProductForm = this.formBuilder.group({
      sku: ['', [Validators.maxLength(100)]],
      name: ['', [Validators.required, Validators.maxLength(200)]],
      description: ['', [Validators.maxLength(1000)]],
      productType: [ProductType.SimpleProduct, Validators.required],
      status: [ProductStatus.Draft, Validators.required],
      isActive: [true],
      isTaxable: [false],
      trackInventory: [true],
      serialNumberTracking: [false],
      batchTracking: [false],
      itemGroupId: [null],
      brandId: [null],
      manufacturerPartNumber: ['', [Validators.maxLength(100)]],
      upc: ['', [Validators.maxLength(50)]],
      ean: ['', [Validators.maxLength(50)]],
      isbn: ['', [Validators.maxLength(50)]],
      sellingPrice: [null, [Validators.min(0), Validators.max(999999999.99)]],
      costPrice: [null, [Validators.min(0), Validators.max(999999999.99)]],
      salesAccountId: [null],
      purchaseAccountId: [null],
      inventoryAccountId: [null],
      unitOfMeasureId: [null],
      reorderLevel: [null, [Validators.min(0)]],
      reorderQuantity: [null, [Validators.min(0)]],
      minimumStock: [null, [Validators.min(0)]],
      maximumStock: [null, [Validators.min(0)]],
      openingStock: [null, [Validators.min(0)]],
      openingStockValue: [null, [Validators.min(0)]],
      isSaleable: [true],
      isPurchasable: [true],
      isReturnable: [true],
      vendorId: [null],
      weight: [null, [Validators.min(0)]],
      weightUnitId: [null],
      length: [null, [Validators.min(0)]],
      width: [null, [Validators.min(0)]],
      height: [null, [Validators.min(0)]],
      dimensionUnitId: [null],
      taxClassificationId: [null],
      taxMasterId: [null],
      isTaxExempt: [false],
      taxExemptReason: [''],
      tagIds: [[]],
      imageUrls: [[]]
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

  onTagsInput(event: any) {
    const value = event.target.value;
    if (value) {
      const tagIds = value.split(',').map((tag: string) => parseInt(tag.trim())).filter((id: number) => !isNaN(id));
      this.addProductForm.patchValue({ tagIds });
    } else {
      this.addProductForm.patchValue({ tagIds: [] });
    }
  }

  onImageUrlsInput(event: any) {
    const value = event.target.value;
    if (value) {
      const imageUrls = value.split('\n').map((url: string) => url.trim()).filter((url: string) => url.length > 0);
      this.addProductForm.patchValue({ imageUrls });
    } else {
      this.addProductForm.patchValue({ imageUrls: [] });
    }
  }

  onImageUpload(imageBase64: string) {
    this.uploadedImages.push(imageBase64);
    this.addProductForm.patchValue({ imageUrls: this.uploadedImages });
  }

  removeImage(index: number) {
    this.uploadedImages.splice(index, 1);
    this.addProductForm.patchValue({ imageUrls: this.uploadedImages });
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
        unitOfMeasureId: formData.unitOfMeasureId,
        reorderLevel: formData.reorderLevel,
        reorderQuantity: formData.reorderQuantity,
        minimumStock: formData.minimumStock,
        maximumStock: formData.maximumStock,
        openingStock: formData.openingStock,
        openingStockValue: formData.openingStockValue,
        isSaleable: formData.isSaleable,
        isPurchasable: formData.isPurchasable,
        isReturnable: formData.isReturnable,
        vendorId: formData.vendorId,
        weight: formData.weight,
        weightUnitId: formData.weightUnitId,
        length: formData.length,
        width: formData.width,
        height: formData.height,
        dimensionUnitId: formData.dimensionUnitId,
        taxClassificationId: formData.taxClassificationId,
        taxMasterId: formData.taxMasterId,
        isTaxExempt: formData.isTaxExempt,
        taxExemptReason: formData.taxExemptReason || null,
        tagIds: formData.tagIds,
        imageUrls: formData.imageUrls
      };

      this.productService.createProduct(createProduct).subscribe({
        next: (response) => {
          console.log('Product created successfully:', response);
          this.notificationService.showSuccess('Product created successfully!');
          this.addProductForm.reset();
          this.uploadedImages = [];
          this.router.navigate(['/app/products/list']);
        },
        error: (error) => {
          console.error('Error creating product:', error);
          this.notificationService.showError('Failed to create product. Please try again.');
        }
      });
    } else {
      console.log('Form is invalid');
      this.addProductForm.markAllAsTouched();
      this.notificationService.showWarning('Please fill in all required fields correctly.');
    }
  }
}
