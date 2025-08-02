import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CountryService } from '../../../../master/services/country.service';
import { StateService } from '../../../../master/services/state.service';
import { CurrencyService } from '../../../../master/services/currency.service';
import { UpdateCustomer } from '../../../../../core/models/customer/update-customer';
import { Customer } from '../../../../../core/models/customer/customer';
import { Dropdown } from '../../../../../core/models/master/dropdown';
import { forkJoin } from 'rxjs';
import { CustomerType } from '../../enums/customer-type.enum';

@Component({
  selector: 'app-customer-edit',
  standalone: false,
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.css',
})
export class CustomerEditComponent implements OnInit {
  customerForm: FormGroup;
  countryOptions: Dropdown[] = [];
  billingStateOptions: Dropdown[] = [];
  shippingStateOptions: Dropdown[] = [];
  currencyOptions: Dropdown[] = [];
  priceListOptions: Dropdown[] = [];
  salutationOptions: { value: string; label: string }[] = [
    { value: 'Mr', label: 'Mr.' },
    { value: 'Ms', label: 'Ms.' },
    { value: 'Mrs', label: 'Mrs.' },
    { value: 'Dr', label: 'Dr.' },
    { value: 'Prof', label: 'Prof.' },
  ];
  isLoading = false;
  isSaving = false;
  customerId: number = 0;
  customer: Customer | null = null;
  uploadedDocuments: File[] = [];
  contactPersons: any[] = [];

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private countryService: CountryService,
    private stateService: StateService,
    private currencyService: CurrencyService
  ) {
    this.customerForm = this.createForm();
  }

  ngOnInit(): void {
    this.customerId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.customerId) {
      this.loadCustomerData();
      this.loadDropdownData();
    } else {
      this.router.navigate(['/app/customers/list']);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      customerType: [CustomerType.Individual.toString(), [Validators.required]],
      salutation: ['', [Validators.required]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      displayName: ['', [Validators.required]],
      companyName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      mobile: [''],
      website: [''],
      billingAddressLine1: [''],
      billingAddressLine2: [''],
      billingCity: [''],
      billingStateId: [''],
      billingCountryId: [''],
      billingPostalCode: [''],
      shippingAddressLine1: [''],
      shippingAddressLine2: [''],
      shippingCity: [''],
      shippingStateId: [''],
      shippingCountryId: [''],
      shippingPostalCode: [''],
      copyBillingAddress: [false],
      creditLimit: [0, [Validators.min(0)]],
      paymentTerms: [''],
      status: ['ACTIVE', [Validators.required]],
      pan: [''],
      currencyId: [''],
      priceListId: [''],
      allowBackOrders: [false],
      sendStatements: [true],
    });
  }

  private loadCustomerData(): void {
    this.isLoading = true;
    this.customerService.getCustomerById(this.customerId).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.customer = response.data;
          this.populateForm(this.customer);
        } else {
          console.error('Customer not found');
          this.router.navigate(['/app/customers/list']);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading customer:', error);
        this.isLoading = false;
        this.router.navigate(['/app/customers/list']);
      },
    });
  }

  private populateForm(customer: Customer): void {
    this.customerForm.patchValue({
      customerType: customer.customerType?.toString(),
      salutation: customer.salutation,
      firstName: customer.firstName,
      lastName: customer.lastName,
      displayName: customer.customerName,
      companyName: customer.companyName,
      email: customer.email,
      phone: customer.workPhone,
      mobile: customer.mobile,
      website: customer.websiteUrl,
      billingAddressLine1: customer.billingAddress,
      billingAddressLine2: '',
      billingCity: customer.city,
      billingStateId: customer.stateId,
      billingCountryId: customer.countryId,
      billingPostalCode: customer.postalCode,
      shippingAddressLine1: customer.shippingAddress || customer.billingAddress,
      shippingAddressLine2: '',
      shippingCity: customer.city,
      shippingStateId: customer.stateId,
      shippingCountryId: customer.countryId,
      shippingPostalCode: customer.postalCode,
      creditLimit: customer.creditLimit || 0,
      paymentTerms: customer.paymentTermDays,
      status: customer.isActive ? 'ACTIVE' : 'INACTIVE',
      pan: customer.panNumber,
      currencyId: customer.currencyId,
      priceListId: customer.priceListId,
      allowBackOrders: customer.allowBackOrders || false,
      sendStatements: customer.sendStatements !== false,
    });

    // Load states for the selected countries
    if (customer.countryId) {
      this.loadStatesForCountry(customer.countryId, 'billing');
      this.loadStatesForCountry(customer.countryId, 'shipping');
    }
  }

  private loadDropdownData(): void {
    forkJoin({
      countries: this.countryService.getCountriesDropdown(),
      currencies: this.currencyService.getCurrenciesDropdown(),
    }).subscribe({
      next: (response) => {
        if (response.countries.success && response.countries.data) {
          this.countryOptions = response.countries.data;
        }

        if (response.currencies.success && response.currencies.data) {
          this.currencyOptions = response.currencies.data;
        }
      },
      error: (error) => {
        console.error('Error loading dropdown data:', error);
      },
    });
  }

  onCountryChange(event: any, addressType: 'billing' | 'shipping'): void {
    const countryId = parseInt(event.target.value);
    if (countryId) {
      this.loadStatesForCountry(countryId, addressType);
    } else {
      if (addressType === 'billing') {
        this.billingStateOptions = [];
      } else {
        this.shippingStateOptions = [];
      }
    }
    this.customerForm.patchValue({
      [`${addressType}StateId`]: '',
    });
  }

  private loadStatesForCountry(
    countryId: number,
    addressType: 'billing' | 'shipping'
  ): void {
    this.stateService.getStatesDropdown(countryId).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          if (addressType === 'billing') {
            this.billingStateOptions = response.data;
          } else {
            this.shippingStateOptions = response.data;
          }
        } else {
          if (addressType === 'billing') {
            this.billingStateOptions = [];
          } else {
            this.shippingStateOptions = [];
          }
        }
      },
      error: (error) => {
        console.error('Error loading states:', error);
        if (addressType === 'billing') {
          this.billingStateOptions = [];
        } else {
          this.shippingStateOptions = [];
        }
      },
    });
  }

  onCopyBillingAddress(): void {
    const copyAddress = this.customerForm.get('copyBillingAddress')?.value;
    if (copyAddress) {
      const billingData = {
        shippingAddressLine1: this.customerForm.get('billingAddressLine1')
          ?.value,
        shippingAddressLine2: this.customerForm.get('billingAddressLine2')
          ?.value,
        shippingCity: this.customerForm.get('billingCity')?.value,
        shippingStateId: this.customerForm.get('billingStateId')?.value,
        shippingCountryId: this.customerForm.get('billingCountryId')?.value,
        shippingPostalCode: this.customerForm.get('billingPostalCode')?.value,
      };
      this.customerForm.patchValue(billingData);

      // Copy states as well
      const billingCountryId = this.customerForm.get('billingCountryId')?.value;
      if (billingCountryId) {
        this.loadStatesForCountry(parseInt(billingCountryId), 'shipping');
      }
    }
  }

  addContactPerson(): void {
    this.contactPersons.push({
      salutation: '',
      firstName: '',
      lastName: '',
      email: '',
      workPhone: '',
      mobile: '',
    });
  }

  removeContactPerson(index: number): void {
    this.contactPersons.splice(index, 1);
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files) {
      for (let file of files) {
        if (
          this.uploadedDocuments.length < 10 &&
          file.size <= 5 * 1024 * 1024
        ) {
          this.uploadedDocuments.push(file);
        }
      }
    }
  }

  removeDocument(index: number): void {
    this.uploadedDocuments.splice(index, 1);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.customerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  updateCustomer(): void {
    if (this.customerForm.valid && this.customer) {
      this.isSaving = true;
      const formData = this.customerForm.value;

      const customerData: UpdateCustomer = {
        id: this.customer.id,
        rowVersion: this.customer.rowVersion ?? 1,
        customerType: parseInt(formData.customerType),
        salutation: formData.salutation,
        firstName: formData.firstName,
        lastName: formData.lastName,
        customerName:
          formData.displayName ||
          `${formData.firstName} ${formData.lastName}`.trim(),
        companyName: formData.companyName,
        email: formData.email,
        workPhone: formData.phone || null,
        mobile: formData.mobile || null,
        websiteUrl: formData.website,
        billingAddress: formData.billingAddressLine1,
        billingAddressLine2: formData.billingAddressLine2,
        billingCity: formData.billingCity,
        billingStateId: formData.billingStateId
          ? parseInt(formData.billingStateId)
          : undefined,
        billingCountryId: formData.billingCountryId
          ? parseInt(formData.billingCountryId)
          : undefined,
        billingPostalCode: formData.billingPostalCode,
        shippingAddress: formData.shippingAddressLine1,
        shippingAddressLine2: formData.shippingAddressLine2,
        shippingCity: formData.shippingCity,
        shippingStateId: formData.shippingStateId
          ? parseInt(formData.shippingStateId)
          : undefined,
        shippingCountryId: formData.shippingCountryId
          ? parseInt(formData.shippingCountryId)
          : undefined,
        shippingPostalCode: formData.shippingPostalCode,
        creditLimit: formData.creditLimit || 0,
        paymentTermDays: formData.paymentTerms,
        isActive: formData.status === 'ACTIVE',
        panNumber: formData.pan,
        currencyId: formData.currencyId
          ? parseInt(formData.currencyId)
          : undefined,
        priceListId: formData.priceListId
          ? parseInt(formData.priceListId)
          : undefined,
        allowBackOrders: formData.allowBackOrders || false,
        sendStatements: formData.sendStatements !== false,
        notes: '',
      };

      this.customerService.updateCustomer(customerData).subscribe({
        next: (response) => {
          this.isSaving = false;
          if (response.success) {
            console.log('Customer updated successfully');
            this.router.navigate(['/app/customers/list']);
          } else {
            console.error('Error updating customer:', response.message);
          }
        },
        error: (error) => {
          this.isSaving = false;
          console.error('Error updating customer:', error);
        },
      });
    } else {
      Object.keys(this.customerForm.controls).forEach((key) => {
        this.customerForm.get(key)?.markAsTouched();
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
