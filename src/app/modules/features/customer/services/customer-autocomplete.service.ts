import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CustomerService } from './customer.service';
import { AutocompleteService } from '../../../shared/services/autocomplete.service';
import { AutocompleteItem } from '../../../../core/models/common/autocomplete-item';
import { CustomerAutocomplete } from '../../../../core/models/customer/customer-autocomplete';

@Injectable({
  providedIn: 'root'
})
export class CustomerAutocompleteService extends AutocompleteService<CustomerAutocomplete> {

  constructor(private customerService: CustomerService) {
    super();
  }

  search(searchTerm: string): Observable<AutocompleteItem<CustomerAutocomplete>[]> {
    return this.customerService.getCustomerAutocomplete(searchTerm).pipe(
      map(response => {
        if (response.success && response.data) {
          return response.data.map(customer => ({
            value: customer.id,
            label: customer.customerName,
            description: customer.companyName || 'Individual',
            code: customer.customerCode,
            data: customer
          }));
        }
        return [];
      }),
      catchError(() => of([]))
    );
  }
}