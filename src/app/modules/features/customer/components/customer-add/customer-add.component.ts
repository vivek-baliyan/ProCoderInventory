import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CountryService } from '../../../../master/services/country.service';
import { StateService } from '../../../../master/services/state.service';
import { CurrencyService } from '../../../../master/services/currency.service';
import { CreateCustomer } from '../../../../../core/models/customer/create-customer';
import { CustomerAddress } from '../../../../../core/models/customer/customer-address';
import { Dropdown } from '../../../../../core/models/master/dropdown';
import { forkJoin } from 'rxjs';
import { CustomerType } from '../../enums/customer-type.enum';
import { AddressType } from '../../../../../core/enums/address-type';
import { CustomerContact } from '../../../../../core/models/customer/customer-contact';
import { ContactType } from '../../../../../core/enums/contact-type';

@Component({
  selector: 'app-customer-add',
  standalone: false,
  templateUrl: './customer-add.component.html',
  styleUrl: './customer-add.component.css'
})
export class CustomerAddComponent implements OnInit {

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
    { value: 'Prof', label: 'Prof.' }
  ];
  isLoading = false;
  isSaving = false;
  uploadedDocuments: File[] = [];
  customerContacts: CustomerContact[] = [];

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private router: Router,
    private customerService: CustomerService,
    private countryService: CountryService,
    private stateService: StateService,
    private currencyService: CurrencyService
  ) {
    this.customerForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadDropdownData();
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
      sendStatements: [true]
    });
  }

  private loadDropdownData(): void {
    this.isLoading = true;
    
    forkJoin({
      countries: this.countryService.getCountriesDropdown(),
      currencies: this.currencyService.getCurrenciesDropdown()
    }).subscribe({
      next: (response) => {
        if (response.countries.success && response.countries.data) {
          this.countryOptions = response.countries.data;
        }
        
        if (response.currencies.success && response.currencies.data) {
          this.currencyOptions = response.currencies.data;
        }
        
        // Set first country and currency as default if available
        if (this.countryOptions.length > 0) {
          const defaultCountryId = this.countryOptions[0].value;
          this.customerForm.patchValue({ 
            billingCountryId: defaultCountryId,
            shippingCountryId: defaultCountryId 
          });
          this.loadStatesForCountry(defaultCountryId, 'billing');
          this.loadStatesForCountry(defaultCountryId, 'shipping');
        }
        
        if (this.currencyOptions.length > 0) {
          this.customerForm.patchValue({ currencyId: this.currencyOptions[0].value });
        }
        
        this.isLoading = false;
      }
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
      [`${addressType}StateId`]: '' 
    });
  }

  private loadStatesForCountry(countryId: number, addressType: 'billing' | 'shipping'): void {
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
      }
    });
  }

  onCopyBillingAddress(): void {
    const copyAddress = this.customerForm.get('copyBillingAddress')?.value;
    if (copyAddress) {
      const billingData = {
        shippingAddressLine1: this.customerForm.get('billingAddressLine1')?.value,
        shippingAddressLine2: this.customerForm.get('billingAddressLine2')?.value,
        shippingCity: this.customerForm.get('billingCity')?.value,
        shippingStateId: this.customerForm.get('billingStateId')?.value,
        shippingCountryId: this.customerForm.get('billingCountryId')?.value,
        shippingPostalCode: this.customerForm.get('billingPostalCode')?.value
      };
      this.customerForm.patchValue(billingData);
      
      // Copy states as well
      const billingCountryId = this.customerForm.get('billingCountryId')?.value;
      if (billingCountryId) {
        this.loadStatesForCountry(parseInt(billingCountryId), 'shipping');
      }
    }
  }

  onContactsChange(contacts: CustomerContact[]): void {
    this.customerContacts = contacts;
  }

  onDocumentsChange(documents: File[]): void {
    this.uploadedDocuments = documents;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.customerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  saveCustomer(): void {
    if (this.customerForm.valid) {
      this.isSaving = true;
      const formData = this.customerForm.value;
      
      const billingAddress: CustomerAddress = {
        id: 0,
        customerId: 0,
        addressType: AddressType.Billing,
        addressLine1: formData.billingAddressLine1,
        addressLine2: formData.billingAddressLine2,
        city: formData.billingCity,
        stateId: formData.billingStateId ? parseInt(formData.billingStateId) : undefined,
        countryId: formData.billingCountryId ? parseInt(formData.billingCountryId) : undefined,
        postalCode: formData.billingPostalCode,
        isPrimary: true,
        isActive: true
      };

      let shippingAddress: CustomerAddress | undefined;
      if (formData.shippingAddressLine1 || formData.shippingCity || formData.shippingPostalCode) {
        shippingAddress = {
          id: 0,
          customerId: 0,
          addressType: AddressType.Shipping,
          addressLine1: formData.shippingAddressLine1,
          addressLine2: formData.shippingAddressLine2,
          city: formData.shippingCity,
          stateId: formData.shippingStateId ? parseInt(formData.shippingStateId) : undefined,
          countryId: formData.shippingCountryId ? parseInt(formData.shippingCountryId) : undefined,
          postalCode: formData.shippingPostalCode,
          isPrimary: false,
          isActive: true
        };
      }

      const customerData: CreateCustomer = {
        customerType: parseInt(formData.customerType),
        salutation: formData.salutation,
        firstName: formData.firstName,
        lastName: formData.lastName,
        displayName: formData.displayName,
        companyName: formData.companyName,
        email: formData.email,
        phoneNumber: formData.phone,
        mobileNumber: formData.mobile,
        websiteUrl: formData.website,
        billingAddress: billingAddress,
        shippingAddress: shippingAddress,
        creditLimit: formData.creditLimit || 0,
        paymentTerms: formData.paymentTerms,
        status: formData.status,
        pan: formData.pan,
        currencyId: formData.currencyId ? parseInt(formData.currencyId) : undefined,
        priceListId: formData.priceListId ? parseInt(formData.priceListId) : undefined,
        allowBackOrders: formData.allowBackOrders || false,
        sendStatements: formData.sendStatements !== false,
        contactPersons: this.customerContacts,
        documents: this.uploadedDocuments
      };
      
      this.customerService.createCustomer(customerData).subscribe({
        next: (response) => {
          this.isSaving = false;
          if (response.success) {
            // Show success message (you can add a toast service here)
            console.log('Customer created successfully');
            this.router.navigate(['/app/customers/list']);
          } else {
            console.error('Error creating customer:', response.message);
          }
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.customerForm.controls).forEach(key => {
        this.customerForm.get(key)?.markAsTouched();
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
