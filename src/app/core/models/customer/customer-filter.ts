export interface CustomerFilter {
  searchTerm?: string;
  customerType?: 'Individual' | 'Business' | '';
  status?: 'ACTIVE' | 'INACTIVE' | '';
  countryId?: number;
  stateId?: number;
  paymentTerms?: string;
  creditLimitMin?: number;
  creditLimitMax?: number;
  createdDateFrom?: Date;
  createdDateTo?: Date;
  
  // Pagination
  pageIndex: number;
  pageSize: number;
  
  // Sorting
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}