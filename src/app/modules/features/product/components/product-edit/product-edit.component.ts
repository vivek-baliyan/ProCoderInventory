import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { NotificationService } from '../../../../../core/services/notification.service';
import { ProductType } from '../../../../../core/enums/product-type.enum';
import { ProductStatus } from '../../../../../core/enums/product-status.enum';
import { UpdateProduct } from '../../../../../core/models/product/update-product';
import { Product } from '../../../../../core/models/product/product';

@Component({
  selector: 'app-product-edit',
  standalone: false,
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit {
  editProductForm!: FormGroup;
  productId!: number;
  isSubmitting = false;
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

  dimensionUnitOptions = [
    { label: 'cm', value: 1 },
    { label: 'inch', value: 2 },
    { label: 'ft', value: 3 },
    { label: 'm', value: 4 },
    { label: 'mm', value: 5 }
  ];

  weightUnitOptions = [
    { label: 'kg', value: 1 },
    { label: 'g', value: 2 },
    { label: 'lb', value: 3 },
    { label: 'oz', value: 4 },
    { label: 'ton', value: 5 }
  ];

  brandOptions: { label: string; value: number }[] = [];
  unitOfMeasureOptions: { label: string; value: number }[] = [];
  salesAccountOptions: { label: string; value: number }[] = [];
  purchaseAccountOptions: { label: string; value: number }[] = [];
  inventoryAccountOptions: { label: string; value: number }[] = [];
  vendorOptions: { label: string; value: number }[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.productId) {
      this.notificationService.showError('Invalid product ID');
      this.router.navigate(['/app/products/list']);
      return;
    }
    
    this.initializeForm();
    this.loadDropdownData();
    
    // Get product data from resolver
    const productResponse = this.route.snapshot.data['product'];
    if (productResponse && productResponse.success && productResponse.data) {
      this.populateForm(productResponse.data);
    } else {
      this.notificationService.showError('Failed to load product');
      this.router.navigate(['/app/products/list']);
    }
  }

  initializeForm() {
    this.editProductForm = this.formBuilder.group({
      productType: [ProductType.Goods, Validators.required],
      name: ['', [Validators.required, Validators.maxLength(200)]],
      sku: ['', [Validators.maxLength(100)]],
      unitOfMeasureId: [null],
      isReturnable: [true],
      length: [null, [Validators.min(0)]],
      width: [null, [Validators.min(0)]],
      height: [null, [Validators.min(0)]],
      dimensionUnitId: [1],
      weight: [null, [Validators.min(0)]],
      weightUnitId: [1],
      brandId: [null],
      manufacturerPartNumber: ['', [Validators.maxLength(100)]],
      upc: ['', [Validators.maxLength(50)]],
      ean: ['', [Validators.maxLength(50)]],
      isbn: ['', [Validators.maxLength(50)]],
      sellingPrice: [null, [Validators.min(0), Validators.max(999999999.99)]],
      salesAccountId: [null],
      costPrice: [null, [Validators.min(0), Validators.max(999999999.99)]],
      purchaseAccountId: [null],
      vendorId: [null],
      trackInventory: [true],
      inventoryAccountId: [null],
      openingStock: [null, [Validators.min(0)]],
      openingStockValue: [null, [Validators.min(0)]],
      reorderLevel: [null, [Validators.min(0)]],
      imageUrls: [[]]
    });
  }


  populateForm(product: Product) {
    this.editProductForm.patchValue({
      productType: product.productType,
      name: product.name || '',
      sku: product.sku || '',
      unitOfMeasureId: product.unitOfMeasureId || null,
      isReturnable: product.isReturnable ?? true,
      length: product.length || null,
      width: product.width || null,
      height: product.height || null,
      dimensionUnitId: product.dimensionUnitId || null,
      weight: product.weight || null,
      weightUnitId: product.weightUnitId || null,
      brandId: product.brandId || null,
      manufacturerPartNumber: product.manufacturerPartNumber || '',
      upc: product.upc || '',
      ean: product.ean || '',
      isbn: product.isbn || '',
      sellingPrice: product.sellingPrice || null,
      salesAccountId: product.salesAccountId || null,
      costPrice: product.costPrice || null,
      purchaseAccountId: product.purchaseAccountId || null,
      vendorId: product.vendorId || null,
      trackInventory: product.trackInventory ?? true,
      inventoryAccountId: product.inventoryAccountId || null,
      openingStock: product.openingStock || null,
      openingStockValue: product.openingStockValue || null,
      reorderLevel: product.reorderLevel || null,
      imageUrls: product.images?.map(img => img.imagePath) || []
    });

    this.uploadedImages = product.images?.map(img => img.imagePath) || [];
  }

  onSave() {
    if (this.editProductForm.valid) {
      this.isSubmitting = true;
      const formData = this.editProductForm.value;
      console.log('Form Data:', formData);
      
      const updateProduct: UpdateProduct = {
        id: this.productId,
        productType: formData.productType,
        name: formData.name,
        sku: formData.sku || null,
        unitOfMeasureId: formData.unitOfMeasureId,
        isReturnable: formData.isReturnable,
        length: formData.length,
        width: formData.width,
        height: formData.height,
        dimensionUnitId: formData.dimensionUnitId,
        weight: formData.weight,
        weightUnitId: formData.weightUnitId,
        brandId: formData.brandId,
        manufacturerPartNumber: formData.manufacturerPartNumber || null,
        upc: formData.upc || null,
        ean: formData.ean || null,
        isbn: formData.isbn || null,
        sellingPrice: formData.sellingPrice,
        salesAccountId: formData.salesAccountId,
        costPrice: formData.costPrice,
        purchaseAccountId: formData.purchaseAccountId,
        vendorId: formData.vendorId,
        trackInventory: formData.trackInventory,
        inventoryAccountId: formData.inventoryAccountId,
        openingStock: formData.openingStock,
        openingStockValue: formData.openingStockValue,
        reorderLevel: formData.reorderLevel,
        //imageUrls: formData.imageUrls
      };

      this.productService.updateProduct(updateProduct).subscribe({
        next: (response) => {
          console.log('Product updated successfully:', response);
          this.notificationService.showSuccess('Product updated successfully!');
          this.router.navigate(['/app/products/list']);
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error updating product:', error);
          this.notificationService.showError('Failed to update product. Please try again.');
          this.isSubmitting = false;
        }
      });
    } else {
      console.log('Form is invalid');
      this.editProductForm.markAllAsTouched();
      this.notificationService.showWarning('Please fill in all required fields correctly.');
    }
  }

  get isNameValid() {
    const nameInput = this.editProductForm.controls['name'];
    return nameInput.invalid && (nameInput.dirty || nameInput.touched);
  }

  get isSellingPriceValid() {
    const priceInput = this.editProductForm.controls['sellingPrice'];
    return priceInput.invalid && (priceInput.dirty || priceInput.touched);
  }

  get isCostPriceValid() {
    const priceInput = this.editProductForm.controls['costPrice'];
    return priceInput.invalid && (priceInput.dirty || priceInput.touched);
  }

  get isProductTypeValid() {
    const productTypeInput = this.editProductForm.controls['productType'];
    return productTypeInput.invalid && (productTypeInput.dirty || productTypeInput.touched);
  }

  onImageUpload(imageBase64: string) {
    this.uploadedImages.push(imageBase64);
    this.editProductForm.patchValue({ imageUrls: this.uploadedImages });
  }

  removeImage(index: number) {
    this.uploadedImages.splice(index, 1);
    this.editProductForm.patchValue({ imageUrls: this.uploadedImages });
  }

  onCancel() {
    this.router.navigate(['/app/products/list']);
  }

  private loadDropdownData() {
    // TODO: Replace with actual API calls
    // For now, using placeholder data
    this.brandOptions = [
      { label: 'Select Brand', value: 0 },
      { label: 'Apple', value: 1 },
      { label: 'Samsung', value: 2 },
      { label: 'Sony', value: 3 }
    ];

    this.unitOfMeasureOptions = [
      { label: 'Select Unit', value: 0 },
      { label: 'Piece', value: 1 },
      { label: 'Box', value: 2 },
      { label: 'Pack', value: 3 },
      { label: 'Set', value: 4 }
    ];

    this.salesAccountOptions = [
      { label: 'Select Sales Account', value: 0 },
      { label: 'Sales Revenue', value: 1 },
      { label: 'Product Sales', value: 2 },
      { label: 'Service Revenue', value: 3 }
    ];

    this.purchaseAccountOptions = [
      { label: 'Select Purchase Account', value: 0 },
      { label: 'Cost of Goods Sold', value: 1 },
      { label: 'Purchases', value: 2 },
      { label: 'Inventory Purchases', value: 3 }
    ];

    this.inventoryAccountOptions = [
      { label: 'Select Inventory Account', value: 0 },
      { label: 'Finished Goods', value: 1 },
      { label: 'Raw Materials', value: 2 },
      { label: 'Work in Progress', value: 3 }
    ];

    this.vendorOptions = [
      { label: 'Select Vendor', value: 0 },
      { label: 'ABC Suppliers', value: 1 },
      { label: 'XYZ Distributors', value: 2 },
      { label: 'Global Trade Co.', value: 3 }
    ];
  }
}
