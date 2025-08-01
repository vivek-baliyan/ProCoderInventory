import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CountryService } from '../../../../master/services/country.service';
import { StateService } from '../../../../master/services/state.service';
import { CurrencyService } from '../../../../master/services/currency.service';
import { CreateCustomer } from '../../../../../core/models/customer/create-customer';
import { Dropdown } from '../../../../../core/models/master/dropdown';
import { forkJoin } from 'rxjs';
import { CustomerType } from '../../enums/customer-type.enum';

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
  contactPersons: any[] = [];

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
      },
      error: (error) => {
        console.error('Error loading dropdown data:', error);
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
      },
      error: (error) => {
        console.error('Error loading states:', error);
        if (addressType === 'billing') {
          this.billingStateOptions = [];
        } else {
          this.shippingStateOptions = [];
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

  addContactPerson(): void {
    this.contactPersons.push({
      salutation: '',
      firstName: '',
      lastName: '',
      email: '',
      workPhone: '',
      mobile: ''
    });
  }

  removeContactPerson(index: number): void {
    this.contactPersons.splice(index, 1);
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files) {
      for (let file of files) {
        if (this.uploadedDocuments.length < 10 && file.size <= 5 * 1024 * 1024) {
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

  saveCustomer(): void {
    if (this.customerForm.valid) {
      this.isSaving = true;
      const formData = this.customerForm.value;
      
      const customerData: CreateCustomer = {
        customerType: parseInt(formData.customerType),
        salutation: formData.salutation,
        firstName: formData.firstName,
        lastName: formData.lastName,
        displayName: formData.displayName,
        companyName: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        mobile: formData.mobile,
        website: formData.website,
        billingAddressLine1: formData.billingAddressLine1,
        billingAddressLine2: formData.billingAddressLine2,
        billingCity: formData.billingCity,
        billingStateId: formData.billingStateId ? parseInt(formData.billingStateId) : undefined,
        billingCountryId: formData.billingCountryId ? parseInt(formData.billingCountryId) : undefined,
        billingPostalCode: formData.billingPostalCode,
        shippingAddressLine1: formData.shippingAddressLine1,
        shippingAddressLine2: formData.shippingAddressLine2,
        shippingCity: formData.shippingCity,
        shippingStateId: formData.shippingStateId ? parseInt(formData.shippingStateId) : undefined,
        shippingCountryId: formData.shippingCountryId ? parseInt(formData.shippingCountryId) : undefined,
        shippingPostalCode: formData.shippingPostalCode,
        creditLimit: formData.creditLimit || 0,
        paymentTerms: formData.paymentTerms,
        status: formData.status,
        pan: formData.pan,
        currencyId: formData.currencyId ? parseInt(formData.currencyId) : undefined,
        priceListId: formData.priceListId ? parseInt(formData.priceListId) : undefined,
        allowBackOrders: formData.allowBackOrders || false,
        sendStatements: formData.sendStatements !== false,
        contactPersons: this.contactPersons,
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
        },
        error: (error) => {
          this.isSaving = false;
          console.error('Error saving customer:', error);
          // Show error message (you can add a toast service here)
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
