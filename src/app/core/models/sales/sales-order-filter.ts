export interface SalesOrderFilter {
  searchTerm?: string;
  customerId?: number;
  status?: 'DRAFT' | 'SENT' | 'CONFIRMED' | 'CANCELLED';
  fromDate?: Date;
  toDate?: Date;
  salespersonId?: number;
  pageIndex: number;
  pageSize: number;
}