import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { CountryService } from '../../../master/services/country.service';
import { StateService } from '../../../master/services/state.service';
import { CurrencyService } from '../../../master/services/currency.service';
import { Dropdown } from '../../../../core/models/master/dropdown';
import { CustomerType } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class CustomerFormService {

  readonly salutationOptions: { value: string; label: string }[] = [
    { value: 'Mr', label: 'Mr.' },
    { value: 'Ms', label: 'Ms.' },
    { value: 'Mrs', label: 'Mrs.' },
    { value: 'Dr', label: 'Dr.' },
    { value: 'Prof', label: 'Prof.' }
  ];

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private stateService: StateService,
    private currencyService: CurrencyService
  ) { }

  createCustomerForm(): FormGroup {
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

  loadDropdownData(): Observable<{
    countries: any;
    currencies: any;
  }> {
    return forkJoin({
      countries: this.countryService.getCountriesDropdown(),
      currencies: this.currencyService.getCurrenciesDropdown()
    });
  }

  loadStatesForCountry(countryId: number): Observable<any> {
    return this.stateService.getStatesDropdown(countryId);
  }

  copyBillingToShipping(form: FormGroup): void {
    const billingData = {
      shippingAddressLine1: form.get('billingAddressLine1')?.value,
      shippingAddressLine2: form.get('billingAddressLine2')?.value,
      shippingCity: form.get('billingCity')?.value,
      shippingStateId: form.get('billingStateId')?.value,
      shippingCountryId: form.get('billingCountryId')?.value,
      shippingPostalCode: form.get('billingPostalCode')?.value
    };
    form.patchValue(billingData);
  }

  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  createContactPerson(): any {
    return {
      salutation: '',
      firstName: '',
      lastName: '',
      email: '',
      workPhone: '',
      mobile: ''
    };
  }

  validateFileUpload(file: File, maxFiles: number, currentFiles: File[]): boolean {
    return currentFiles.length < maxFiles && file.size <= 5 * 1024 * 1024; // 5MB
  }
}