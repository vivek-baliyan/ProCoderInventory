import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutocompleteItem } from '../../../core/models/common/autocomplete-item';

@Injectable()
export abstract class AutocompleteService<T = any> {
  abstract search(searchTerm: string): Observable<AutocompleteItem<T>[]>;
}