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

@Component({
  selector: 'app-customer-edit',
  standalone: false,
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.css'
})
export class CustomerEditComponent implements OnInit {

  customerForm: FormGroup;
  countryOptions: Dropdown[] = [];
  stateOptions: Dropdown[] = [];
  currencyOptions: Dropdown[] = [];
  isLoading = false;
  isSaving = false;
  customerId: number = 0;
  customer: Customer | null = null;

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
      }
    });
  }

  private populateForm(customer: Customer): void {
    this.customerForm.patchValue({
      customerType: customer.customerType,
      customerName: customer.customerName,
      displayName: customer.displayName,
      companyName: customer.companyName,
      email: customer.email,
      phone: customer.phone,
      mobile: customer.mobile,
      website: customer.website,
      addressLine1: customer.addressLine1,
      addressLine2: customer.addressLine2,
      city: customer.city,
      stateId: customer.stateId,
      countryId: customer.countryId,
      postalCode: customer.postalCode,
      creditLimit: customer.creditLimit,
      paymentTerms: customer.paymentTerms,
      status: customer.status,
      taxId: customer.taxId,
      currencyId: customer.currencyId,
      notes: customer.notes,
      allowBackOrders: customer.allowBackOrders,
      sendStatements: customer.sendStatements
    });

    // Load states for the selected country
    if (customer.countryId) {
      this.loadStatesForCountry(customer.countryId);
    }
  }

  private loadDropdownData(): void {
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
      },
      error: (error) => {
        console.error('Error loading dropdown data:', error);
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

  updateCustomer(): void {
    if (this.customerForm.valid && this.customer) {
      this.isSaving = true;
      const formData = this.customerForm.value;
      
      const customerData: UpdateCustomer = {
        id: this.customer.id,
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
        }
      });
    } else {
      Object.keys(this.customerForm.controls).forEach(key => {
        this.customerForm.get(key)?.markAsTouched();
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}