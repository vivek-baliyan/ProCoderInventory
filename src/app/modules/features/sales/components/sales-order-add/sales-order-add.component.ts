import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SalesOrderService } from '../../services/sales-order.service';
import { CustomerService } from '../../../customer/services/customer.service';
import { ProductService } from '../../../product/services/product.service';
import {
  CreateSalesOrder,
  CreateSalesOrderItem,
} from '../../../../../core/models/sales/create-sales-order';
import { Dropdown } from '../../../../../core/models/master/dropdown';
import { CustomerAutocompleteService } from '../../../customer/services/customer-autocomplete.service';
import { AutocompleteItem } from '../../../../../core/models/common/autocomplete-item';

@Component({
  selector: 'app-sales-order-add',
  standalone: false,
  templateUrl: './sales-order-add.component.html',
  styleUrl: './sales-order-add.component.css',
})
export class SalesOrderAddComponent implements OnInit {
  salesOrderForm: FormGroup;
  productOptions: Dropdown[] = [];
  salespersonOptions: Dropdown[] = [];
  paymentTermsOptions: { value: string; label: string }[] = [
    { value: 'Due on Receipt', label: 'Due on Receipt' },
    { value: 'NET_15', label: 'Net 15' },
    { value: 'NET_30', label: 'Net 30' },
    { value: 'NET_45', label: 'Net 45' },
    { value: 'NET_60', label: 'Net 60' },
  ];
  deliveryMethodOptions: { value: string; label: string }[] = [
    { value: 'Standard', label: 'Standard Delivery' },
    { value: 'Express', label: 'Express Delivery' },
    { value: 'Pickup', label: 'Customer Pickup' },
  ];

  // Autocomplete service
  customerAutocompleteService: CustomerAutocompleteService;
  selectedCustomer: AutocompleteItem | null = null;

  isLoading = false;
  isSaving = false;
  uploadedDocuments: File[] = [];

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private salesOrderService: SalesOrderService,
    private customerService: CustomerService,
    private productService: ProductService,
    customerAutocompleteService: CustomerAutocompleteService
  ) {
    this.salesOrderForm = this.createForm();
    this.customerAutocompleteService = customerAutocompleteService;
  }

  ngOnInit(): void {
    this.generateOrderNumber();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      customerId: ['', [Validators.required]],
      orderNumber: ['', [Validators.required]],
      referenceNumber: [''],
      orderDate: [
        new Date().toISOString().split('T')[0],
        [Validators.required],
      ],
      expectedShipmentDate: [''],
      paymentTerms: ['Due on Receipt'],
      deliveryMethod: [''],
      salespersonId: [''],

      // Items
      items: this.fb.array([]),

      // Financial
      subtotal: [0],
      shippingCharges: [0, [Validators.min(0)]],
      adjustment: [0],
      totalAmount: [0],
      totalQuantity: [0],

      // Additional Information
      customerNotes: [''],
      termsAndConditions: [''],
    });
  }

  get itemsFormArray(): FormArray {
    return this.salesOrderForm.get('items') as FormArray;
  }

  generateOrderNumber(): void {
    this.salesOrderService.generateOrderNumber().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.salesOrderForm.patchValue({ orderNumber: response.data });
        }
      },
    });
  }

  addItem(): void {
    const itemGroup = this.fb.group({
      productId: ['', [Validators.required]],
      productName: [''],
      productSku: [''],
      description: [''],
      quantity: [1, [Validators.required, Validators.min(0.01)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      discountPercentage: [0, [Validators.min(0), Validators.max(100)]],
      discountAmount: [0],
      taxAmount: [0],
      lineTotal: [0],
    });

    // Subscribe to value changes for calculations
    itemGroup.valueChanges.subscribe(() => {
      this.calculateItemTotal(itemGroup);
      this.calculateOrderTotals();
    });

    this.itemsFormArray.push(itemGroup);
  }

  removeItem(index: number): void {
    this.itemsFormArray.removeAt(index);
    this.calculateOrderTotals();
  }

  private calculateItemTotal(itemGroup: FormGroup): void {
    const quantity = itemGroup.get('quantity')?.value || 0;
    const unitPrice = itemGroup.get('unitPrice')?.value || 0;
    const discountPercentage = itemGroup.get('discountPercentage')?.value || 0;

    const subtotal = quantity * unitPrice;
    const discountAmount = (subtotal * discountPercentage) / 100;
    const lineTotal = subtotal - discountAmount;

    itemGroup.patchValue(
      {
        discountAmount: discountAmount,
        lineTotal: lineTotal,
      },
      { emitEvent: false }
    );
  }

  private calculateOrderTotals(): void {
    const items = this.itemsFormArray.value;
    const subtotal = items.reduce(
      (sum: number, item: any) => sum + (item.lineTotal || 0),
      0
    );
    const totalQuantity = items.reduce(
      (sum: number, item: any) => sum + (item.quantity || 0),
      0
    );
    const shippingCharges =
      this.salesOrderForm.get('shippingCharges')?.value || 0;
    const adjustment = this.salesOrderForm.get('adjustment')?.value || 0;
    const totalAmount = subtotal + shippingCharges + adjustment;

    this.salesOrderForm.patchValue(
      {
        subtotal: subtotal,
        totalQuantity: totalQuantity,
        totalAmount: totalAmount,
      },
      { emitEvent: false }
    );
  }

  onShippingOrAdjustmentChange(): void {
    setTimeout(() => this.calculateOrderTotals(), 0);
  }

  onDocumentsChange(documents: File[]): void {
    this.uploadedDocuments = documents;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.salesOrderForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isItemFieldInvalid(itemIndex: number, fieldName: string): boolean {
    const itemGroup = this.itemsFormArray.at(itemIndex) as FormGroup;
    const field = itemGroup.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  saveDraft(): void {
    this.saveSalesOrder('DRAFT');
  }

  saveAndSend(): void {
    this.saveSalesOrder('SENT');
  }

  private saveSalesOrder(status: 'DRAFT' | 'SENT'): void {
    if (this.salesOrderForm.valid && this.itemsFormArray.length > 0) {
      this.isSaving = true;
      const formData = this.salesOrderForm.value;

      const items: CreateSalesOrderItem[] = formData.items.map((item: any) => ({
        productId: parseInt(item.productId),
        productName: item.productName,
        productSku: item.productSku,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        discountPercentage: item.discountPercentage,
        discountAmount: item.discountAmount,
        taxAmount: item.taxAmount,
        lineTotal: item.lineTotal,
      }));

      const salesOrderData: CreateSalesOrder = {
        customerId: parseInt(formData.customerId),
        orderNumber: formData.orderNumber,
        referenceNumber: formData.referenceNumber,
        orderDate: new Date(formData.orderDate),
        expectedShipmentDate: formData.expectedShipmentDate
          ? new Date(formData.expectedShipmentDate)
          : undefined,
        paymentTerms: formData.paymentTerms,
        deliveryMethod: formData.deliveryMethod,
        salespersonId: formData.salespersonId
          ? parseInt(formData.salespersonId)
          : undefined,
        items: items,
        subtotal: formData.subtotal,
        shippingCharges: formData.shippingCharges,
        adjustment: formData.adjustment,
        totalAmount: formData.totalAmount,
        totalQuantity: formData.totalQuantity,
        customerNotes: formData.customerNotes,
        termsAndConditions: formData.termsAndConditions,
        documents: this.uploadedDocuments,
        status: status,
      };

      this.salesOrderService.createSalesOrder(salesOrderData).subscribe({
        next: (response) => {
          this.isSaving = false;
          if (response.success) {
            console.log('Sales order created successfully');
            this.router.navigate(['/app/sales/orders/list']);
          } else {
            console.error('Error creating sales order:', response.message);
          }
        },
        error: () => {
          this.isSaving = false;
        },
      });
    } else {
      Object.keys(this.salesOrderForm.controls).forEach((key) => {
        this.salesOrderForm.get(key)?.markAsTouched();
      });

      this.itemsFormArray.controls.forEach((control) => {
        Object.keys(control.value).forEach((key) => {
          control.get(key)?.markAsTouched();
        });
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  // Autocomplete event handlers
  onCustomerSelected(customer: AutocompleteItem): void {
    this.selectedCustomer = customer;
    this.salesOrderForm.patchValue({
      customerId: customer.value
    });
  }

  onAddNewCustomer(searchTerm: string): void {
    this.router.navigate(['/app/customer/add'], {
      queryParams: { name: searchTerm, returnUrl: this.router.url }
    });
  }
}
