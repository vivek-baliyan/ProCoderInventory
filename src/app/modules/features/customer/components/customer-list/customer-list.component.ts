import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { CustomerListItem } from '../../../../../core/models/customer/customer-list-item';
import { CustomerFilter } from '../../../../../core/models/customer/customer-filter';
import { CountryService } from '../../../../master/services/country.service';
import { Dropdown } from '../../../../../core/models/master/dropdown';
import { PaginatedResult } from '../../../../../core/models/common/paginated-result';
import { debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../../../../core/services/notification.service';
import { CustomerType } from '../../enums/customer-type.enum';

export interface BulkAction {
  action: 'delete' | 'activate' | 'deactivate' | 'export';
  customers: CustomerListItem[];
}

@Component({
  selector: 'app-customer-list',
  standalone: false,
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
})
export class CustomerListComponent implements OnInit {
  customers: CustomerListItem[] = [];
  filteredCustomers: CustomerListItem[] = [];
  loading = false;
  searchControl = new FormControl('');

  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 1;

  // Filtering
  selectedCustomerType = 0; // 0: All, CustomerType.Individual, CustomerType.Business
  selectedStatus = '';
  selectedCountry = '';
  countryOptions: Dropdown[] = [];

  // Sorting
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Bulk operations
  selectedCustomers: number[] = [];
  showBulkActions = false;

  modalRef?: BsModalRef;
  Math = Math;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private countryService: CountryService,
    private modalService: BsModalService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
    this.loadCountries();
    this.setupSearch();
  }

  private setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchTerm) => {
          if (searchTerm && searchTerm.trim()) {
            return this.customerService.searchCustomers(searchTerm.trim());
          } else {
            this.loadCustomers();
            return of(null);
          }
        })
      )
      .subscribe({
        next: (response) => {
          if (response && response.success && response.data) {
            this.customers = response.data.data;
            this.applyFilters();
          }
        },
        error: (error) => {
          console.error('Search error:', error);
          this.notificationService.showError('Error searching customers');
        },
      });
  }

  private loadCustomers(): void {
    this.loading = true;
    const filter: CustomerFilter = {
      pageIndex: this.currentPage - 1,
      pageSize: this.pageSize,
      customerType: this.selectedCustomerType as any,
      status: this.selectedStatus as any,
      countryId: this.selectedCountry
        ? parseInt(this.selectedCountry)
        : undefined,
      sortBy: this.sortColumn,
      sortOrder: this.sortDirection,
    };

    this.customerService.filterCustomers(filter).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success && response.data) {
          const paginatedResult = response.data;
          this.customers = paginatedResult.data;
          this.totalItems = paginatedResult.totalCount;
          this.totalPages = paginatedResult.totalPages;
          this.currentPage = paginatedResult.pageIndex + 1; // Convert from 0-based to 1-based
          this.applyFilters();
        } else {
          this.customers = [];
          this.filteredCustomers = [];
          this.totalItems = 0;
          this.totalPages = 0;
        }
      },
      error: (error) => {
        this.loading = false;
        console.error('Error loading customers:', error);
        this.notificationService.showError('Error loading customers');
        this.customers = [];
        this.filteredCustomers = [];
        this.totalItems = 0;
        this.totalPages = 0;
      },
    });
  }

  private loadCountries(): void {
    this.countryService.getCountriesDropdown().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.countryOptions = response.data;
        }
      },
      error: (error) => {
        console.error('Error loading countries:', error);
      },
    });
  }

  private applyFilters(): void {
    this.filteredCustomers = [...this.customers];
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadCustomers();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadCustomers();
  }

  onSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.loadCustomers();
  }

  onCustomerSelect(customerId: number, event: any): void {
    if (event.target.checked) {
      this.selectedCustomers.push(customerId);
    } else {
      this.selectedCustomers = this.selectedCustomers.filter(
        (id) => id !== customerId
      );
    }
    this.showBulkActions = this.selectedCustomers.length > 0;
  }

  onSelectAll(event: any): void {
    if (event.target.checked) {
      this.selectedCustomers = this.filteredCustomers.map((c) => c.id);
    } else {
      this.selectedCustomers = [];
    }
    this.showBulkActions = this.selectedCustomers.length > 0;
  }

  isSelected(customerId: number): boolean {
    return this.selectedCustomers.includes(customerId);
  }

  isAllSelected(): boolean {
    return (
      this.filteredCustomers.length > 0 &&
      this.selectedCustomers.length === this.filteredCustomers.length
    );
  }

  clearSelection(): void {
    this.selectedCustomers = [];
    this.showBulkActions = false;
  }

  navigateToAdd(): void {
    this.router.navigate(['/app/customers/add']);
  }

  navigateToEdit(customer: CustomerListItem): void {
    this.router.navigate(['/app/customers/edit', customer.id]);
  }

  navigateToView(customer: CustomerListItem): void {
    this.router.navigate(['/app/customers/view', customer.id]);
  }

  confirmDelete(customer: CustomerListItem, template: any): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    this.modalRef.content = { customer };
  }

  deleteCustomer(customerId: number): void {
    this.customerService.deleteCustomer(customerId).subscribe({
      next: (response) => {
        if (response.success) {
          this.notificationService.showSuccess('Customer deleted successfully');
          this.loadCustomers();
        } else {
          this.notificationService.showError(
            response.message || 'Error deleting customer'
          );
        }
        this.modalRef?.hide();
      },
      error: (error) => {
        console.error('Error deleting customer:', error);
        this.notificationService.showError('Error deleting customer');
        this.modalRef?.hide();
      },
    });
  }

  toggleCustomerStatus(customer: CustomerListItem): void {
    this.customerService.toggleCustomerStatus(customer.id).subscribe({
      next: (response) => {
        if (response.success) {
          const newStatus =
            customer.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
          this.notificationService.showSuccess(
            `Customer ${newStatus.toLowerCase()} successfully`
          );
          this.loadCustomers();
        } else {
          this.notificationService.showError(
            response.message || 'Error updating customer status'
          );
        }
      },
      error: (error) => {
        console.error('Error toggling customer status:', error);
        this.notificationService.showError('Error updating customer status');
      },
    });
  }

  bulkDelete(): void {
    if (this.selectedCustomers.length === 0) return;

    if (
      confirm(
        `Are you sure you want to delete ${this.selectedCustomers.length} customer(s)?`
      )
    ) {
      // Implement bulk delete logic
      console.log('Bulk delete:', this.selectedCustomers);
      this.notificationService.showInfo(
        'Bulk delete functionality to be implemented'
      );
    }
  }

  bulkActivate(): void {
    if (this.selectedCustomers.length === 0) return;
    console.log('Bulk activate:', this.selectedCustomers);
    this.notificationService.showInfo(
      'Bulk activate functionality to be implemented'
    );
  }

  bulkDeactivate(): void {
    if (this.selectedCustomers.length === 0) return;
    console.log('Bulk deactivate:', this.selectedCustomers);
    this.notificationService.showInfo(
      'Bulk deactivate functionality to be implemented'
    );
  }

  exportCustomers(): void {
    console.log(
      'Export customers:',
      this.selectedCustomers.length > 0 ? this.selectedCustomers : 'all'
    );
    this.notificationService.showInfo('Export functionality to be implemented');
  }

  refreshData(): void {
    this.clearSelection();
    this.currentPage = 1;
    this.loadCustomers();
  }

  getStatusBadgeClass(status: string): string {
    return status === 'ACTIVE' ? 'badge bg-success' : 'badge bg-secondary';
  }

  getCustomerTypeIcon(customerType: CustomerType): string {
    return customerType == CustomerType.Business
      ? 'icofont-building-alt'
      : 'icofont-user';
  }

  getCustomerTypeBadgeClass(customerType: CustomerType | string): string {
    const isBusiness = typeof customerType === 'string' 
      ? customerType === 'Business'
      : customerType === CustomerType.Business;
    return isBusiness ? 'badge bg-info' : 'badge bg-secondary';
  }

  getPaginationArray(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    const halfMaxPages = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, this.currentPage - halfMaxPages);
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }
}
