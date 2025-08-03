import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CountryService } from '../../../../master/services/country.service';
import { StateService } from '../../../../master/services/state.service';
import { CurrencyService } from '../../../../master/services/currency.service';
import { UpdateCustomer } from '../../../../../core/models/customer/update-customer';
import { CustomerAddress } from '../../../../../core/models/customer/customer-address';
import { Customer } from '../../../../../core/models/customer/customer';
import { Dropdown } from '../../../../../core/models/master/dropdown';
import { forkJoin } from 'rxjs';
import { CustomerType } from '../../enums/customer-type.enum';
import { AddressType } from '../../../../../core/enums/address-type';
import { CustomerContact } from '../../../../../core/models/customer/customer-contact';

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
  customerContacts: CustomerContact[] = [];

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
      status: ['ACTIVE'],
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
          this.customerContacts = this.customer.contactPersons || [];
          this.populateForm(this.customer);
        } else {
          console.error('Customer not found');
          this.router.navigate(['/app/customers/list']);
        }
        this.isLoading = false;
      }
    });
  }

  private populateForm(customer: Customer): void {
    const primaryContact = customer.primaryContact;
    const billingAddr = customer.billingAddress;
    const shippingAddr = customer.shippingAddress;
    
    this.customerForm.patchValue({
      customerType: customer.customerType?.toString(),
      salutation: primaryContact?.salutation,
      firstName: primaryContact?.firstName,
      lastName: primaryContact?.lastName,
      displayName: customer.displayName,
      companyName: customer.companyName,
      email: primaryContact?.email,
      phone: primaryContact?.phoneNumber,
      mobile: primaryContact?.mobileNumber,
      website: customer.websiteUrl,
      billingAddressLine1: billingAddr?.addressLine1,
      billingAddressLine2: billingAddr?.addressLine2,
      billingCity: billingAddr?.city,
      billingStateId: billingAddr?.stateId?.toString(),
      billingCountryId: billingAddr?.countryId?.toString(),
      billingPostalCode: billingAddr?.postalCode,
      shippingAddressLine1: shippingAddr?.addressLine1 || billingAddr?.addressLine1,
      shippingAddressLine2: shippingAddr?.addressLine2 || billingAddr?.addressLine2,
      shippingCity: shippingAddr?.city || billingAddr?.city,
      shippingStateId: shippingAddr?.stateId?.toString() || billingAddr?.stateId?.toString(),
      shippingCountryId: shippingAddr?.countryId?.toString() || billingAddr?.countryId?.toString(),
      shippingPostalCode: shippingAddr?.postalCode || billingAddr?.postalCode,
      creditLimit: customer.financial?.creditLimit || 0,
      paymentTerms: customer.financial?.paymentTermDays?.toString(),
      status: customer.isActive ? 'ACTIVE' : 'INACTIVE',
      pan: customer.panNumber,
      currencyId: customer.currencyId?.toString(),
      priceListId: customer.priceListId?.toString(),
      allowBackOrders: customer.allowBackOrders || false,
      sendStatements: customer.sendStatements !== false,
    });

    // Load states for the selected countries
    if (billingAddr?.countryId) {
      this.loadStatesForCountry(billingAddr.countryId, 'billing');
    }
    if (shippingAddr?.countryId) {
      this.loadStatesForCountry(shippingAddr.countryId, 'shipping');
    } else if (billingAddr?.countryId) {
      this.loadStatesForCountry(billingAddr.countryId, 'shipping');
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
      }
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

  getFormValidationErrors(): any {
    const formErrors: any = {};
    
    Object.keys(this.customerForm.controls).forEach(key => {
      const controlErrors = this.customerForm.get(key)?.errors;
      if (controlErrors) {
        formErrors[key] = controlErrors;
      }
    });
    
    return formErrors;
  }

  updateCustomer(): void {
    console.log('Form Status:', this.customerForm.status);
    console.log('Form Valid:', this.customerForm.valid);
    console.log('Form Errors:', this.getFormValidationErrors());
    
    if (this.customerForm.valid && this.customer) {
      this.isSaving = true;
      const formData = this.customerForm.value;
      console.log('Form Data:', formData);
      const billingAddress: CustomerAddress = {
        id: this.customer.billingAddress?.id || 0,
        customerId: this.customer.id,
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
          id: this.customer.shippingAddress?.id || 0,
          customerId: this.customer.id,
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

      const customerData: UpdateCustomer = {
        id: this.customer.id,
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
      
      this.customerService.updateCustomer(customerData).subscribe({
        next: (response) => {
          this.isSaving = false;
          if (response.success) {
            console.log('Customer updated successfully');
            this.router.navigate(['/app/customers/list']);
          } else {
            console.error('Error updating customer:', response.message);
          }
        }
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
