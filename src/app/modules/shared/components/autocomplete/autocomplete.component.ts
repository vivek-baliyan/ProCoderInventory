import { Component, Input, Output, EventEmitter, OnInit, forwardRef, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith, map } from 'rxjs/operators';
import { AutocompleteItem } from '../../../../core/models/common/autocomplete-item';
import { AutocompleteService } from '../../services/autocomplete.service';

@Component({
  selector: 'app-autocomplete',
  standalone: false,
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]
})
export class AutocompleteComponent implements OnInit, ControlValueAccessor {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  @Input() placeholder: string = 'Search...';
  @Input() service!: AutocompleteService;
  @Input() showAddNew: boolean = false;
  @Input() addNewText: string = 'Add New';
  @Input() debounceMs: number = 300;
  @Input() minSearchLength: number = 2;
  @Input() maxResults: number = 10;
  @Input() displayProperty: string = 'label';
  @Input() descriptionProperty: string = 'description';

  @Output() itemSelected = new EventEmitter<AutocompleteItem>();
  @Output() addNewClicked = new EventEmitter<string>();

  searchControl = new FormControl('');
  filteredItems$: Observable<AutocompleteItem[]> = of([]);
  showDropdown = false;
  selectedItem: AutocompleteItem | null = null;


  // ControlValueAccessor properties
  private onChange = (value: any) => {};
  private onTouched = () => {};

  ngOnInit(): void {
    this.setupAutocomplete();
  }

  private setupAutocomplete(): void {
    this.filteredItems$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(this.debounceMs),
      distinctUntilChanged(),
      switchMap((searchTerm: string | null) => {
        const term = searchTerm || '';
        if (term && term.length >= this.minSearchLength && this.service) {
          return this.service.search(term).pipe(
            map(items => items.slice(0, this.maxResults))
          );
        }
        return of([]);
      })
    );
  }

  onInputFocus(): void {
    this.showDropdown = true;
    this.onTouched();
  }

  onInputBlur(): void {
    setTimeout(() => {
      this.showDropdown = false;
    }, 300);
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
    if (this.showDropdown && this.searchInput) {
      setTimeout(() => this.searchInput.nativeElement.focus(), 0);
    }
  }

  selectItem(item: AutocompleteItem): void {
    this.selectedItem = item;
    this.searchControl.setValue(item.label, { emitEvent: false });
    this.showDropdown = false;
    this.onChange(item.value);
    this.itemSelected.emit(item);
  }

  addNew(): void {
    const searchValue = this.searchControl.value || '';
    this.showDropdown = false;
    this.addNewClicked.emit(searchValue);
  }

  clearSelection(): void {
    this.selectedItem = null;
    this.searchControl.setValue('', { emitEvent: false });
    this.onChange(null);
  }

  getItemInitials(label: string): string {
    if (!label) return '';
    const words = label.split(' ');
    if (words.length >= 2) {
      return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    }
    return label.charAt(0).toUpperCase();
  }

  trackByItemId(index: number, item: AutocompleteItem): number {
    return item.value;
  }

  // ControlValueAccessor implementation
  writeValue(value: any): void {
    if (value !== undefined && value !== null) {
      // If we have a value, we need to find the corresponding item
      // This would typically require a service method to get item by ID
      this.onChange(value);
    } else {
      this.clearSelection();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
