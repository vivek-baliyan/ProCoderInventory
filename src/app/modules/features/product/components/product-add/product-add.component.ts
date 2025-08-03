import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { NotificationService } from '../../../../../core/services/notification.service';
import { ProductType } from '../../../../../core/enums/product-type.enum';
import { ProductStatus } from '../../../../../core/enums/product-status.enum';
import { CreateProduct } from '../../../../../core/models/product/create-product';
import { UnitOfMeasureService } from '../../../../master/services/unit-of-measure.service';
import { UnitType } from '../../../../../core/enums/unit-type';
import { Dropdown } from '../../../../../core/models/master/dropdown';
import { BrandService } from '../../../../master/services/brand.service';

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

  dimensionUnitOptions: Dropdown[] = [];

  weightUnitOptions: Dropdown[] = [];

  brandOptions: Dropdown[] = [];
  unitOfMeasureOptions: Dropdown[] = [];
  salesAccountOptions: Dropdown[] = [];
  purchaseAccountOptions: Dropdown[] = [];
  inventoryAccountOptions: Dropdown[] = [];
  vendorOptions: Dropdown[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private unitOfMeasureService: UnitOfMeasureService,
    private brandService: BrandService,
    private productService: ProductService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadDropdownData();
  }

  initializeForm() {
    this.addProductForm = this.formBuilder.group({
      productType: [ProductType.Goods, Validators.required],
      name: ['', [Validators.required, Validators.maxLength(200)]],
      sku: ['', [Validators.maxLength(100)]],
      unitOfMeasureId: [null],
      isReturnable: [true],
      length: [null, [Validators.min(0)]],
      width: [null, [Validators.min(0)]],
      height: [null, [Validators.min(0)]],
      dimensionUnitId: [31],
      weight: [null, [Validators.min(0)]],
      weightUnitId: [11],
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
      imageUrls: [[]],
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

  saveProduct() {
    if (this.addProductForm.valid) {
      const formData = this.addProductForm.value;
      console.log('Form Data:', formData);

      const createProduct: CreateProduct = {
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
        //imagePath: formData.imageUrls
      };

      this.productService.createProduct(createProduct).subscribe({
        next: (response) => {
          console.log('Product created successfully:', response);
          this.notificationService.showSuccess('Product created successfully!');
          this.addProductForm.reset();
          this.uploadedImages = [];
          this.router.navigate(['/app/products/list']);
        }
      });
    } else {
      console.log('Form is invalid');
      this.addProductForm.markAllAsTouched();
      this.notificationService.showWarning(
        'Please fill in all required fields correctly.'
      );
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

  private loadDropdownData() {
    // TODO: Replace with actual API calls
    // For now, using placeholder data

    this.unitOfMeasureService.getUnitsDropdown().subscribe((response) => {
      this.unitOfMeasureOptions = response.data.filter(
        (u) => u.additionalData.unitType == UnitType.Quantity
      );

      this.dimensionUnitOptions = response.data.filter(
        (u) => u.additionalData.unitType == UnitType.Length
      );

      this.weightUnitOptions = response.data.filter(
        (u) => u.additionalData.unitType == UnitType.Weight
      );
    });

    this.brandService.getBrandsDropdown().subscribe((response) => {
      this.brandOptions = response.data;
    });

    // this.brandOptions = [
    //   { label: 'Select Brand', value: 0 },
    //   { label: 'Apple', value: 1 },
    //   { label: 'Samsung', value: 2 },
    //   { label: 'Sony', value: 3 },
    // ];

    // this.salesAccountOptions = [
    //   { label: 'Select Sales Account', value: 0 },
    //   { label: 'Sales Revenue', value: 1 },
    //   { label: 'Product Sales', value: 2 },
    //   { label: 'Service Revenue', value: 3 },
    // ];

    // this.purchaseAccountOptions = [
    //   { label: 'Select Purchase Account', value: 0 },
    //   { label: 'Cost of Goods Sold', value: 1 },
    //   { label: 'Purchases', value: 2 },
    //   { label: 'Inventory Purchases', value: 3 },
    // ];

    // this.inventoryAccountOptions = [
    //   { label: 'Select Inventory Account', value: 0 },
    //   { label: 'Finished Goods', value: 1 },
    //   { label: 'Raw Materials', value: 2 },
    //   { label: 'Work in Progress', value: 3 },
    // ];

    // this.vendorOptions = [
    //   { label: 'Select Vendor', value: 0 },
    //   { label: 'ABC Suppliers', value: 1 },
    //   { label: 'XYZ Distributors', value: 2 },
    //   { label: 'Global Trade Co.', value: 3 },
    // ];
  }
}
