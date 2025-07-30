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

@Component({
  selector: 'app-customer-add',
  standalone: false,
  templateUrl: './customer-add.component.html',
  styleUrl: './customer-add.component.css'
})
export class CustomerAddComponent implements OnInit {

  customerForm: FormGroup;
  countryOptions: Dropdown[] = [];
  stateOptions: Dropdown[] = [];
  currencyOptions: Dropdown[] = [];
  isLoading = false;
  isSaving = false;

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
      customerType: ['Individual', [Validators.required]],
      customerName: ['', [Validators.required, Validators.minLength(2)]],
      displayName: [''],
      companyName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      mobile: [''],
      website: [''],
      addressLine1: [''],
      addressLine2: [''],
      city: [''],
      stateId: [''],
      countryId: [''],
      postalCode: [''],
      creditLimit: [0, [Validators.min(0)]],
      paymentTerms: [''],
      status: ['ACTIVE', [Validators.required]],
      taxId: [''],
      currencyId: [''],
      notes: [''],
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
          this.customerForm.patchValue({ countryId: defaultCountryId });
          this.loadStatesForCountry(defaultCountryId);
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

  onCountryChange(event: any): void {
    const countryId = parseInt(event.target.value);
    if (countryId) {
      this.loadStatesForCountry(countryId);
    } else {
      this.stateOptions = [];
    }
    this.customerForm.patchValue({ stateId: '' });
  }

  private loadStatesForCountry(countryId: number): void {
    this.stateService.getStatesDropdown(countryId).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.stateOptions = response.data;
        } else {
          this.stateOptions = [];
        }
      },
      error: (error) => {
        console.error('Error loading states:', error);
        this.stateOptions = [];
      }
    });
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
        customerType: formData.customerType,
        customerName: formData.customerName,
        displayName: formData.displayName || formData.customerName,
        companyName: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        mobile: formData.mobile,
        website: formData.website,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        city: formData.city,
        stateId: formData.stateId ? parseInt(formData.stateId) : undefined,
        countryId: formData.countryId ? parseInt(formData.countryId) : undefined,
        postalCode: formData.postalCode,
        creditLimit: formData.creditLimit || 0,
        paymentTerms: formData.paymentTerms,
        status: formData.status,
        taxId: formData.taxId,
        currencyId: formData.currencyId ? parseInt(formData.currencyId) : undefined,
        notes: formData.notes,
        allowBackOrders: formData.allowBackOrders || false,
        sendStatements: formData.sendStatements !== false
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
