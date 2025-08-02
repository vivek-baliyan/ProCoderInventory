import { CustomerType } from "../../../modules/features/customer/enums";

export interface CustomerFilter {
  searchTerm?: string;
  customerType?: CustomerType;
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