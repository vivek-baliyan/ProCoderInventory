export interface ProductFilter {
  searchTerm?: string;
  sku?: string;
  productType?: number;
  status?: number;
  isActive?: boolean;
  brandId?: number;
  itemGroupId?: number;
  minPrice?: number;
  maxPrice?: number;
  isTaxable?: boolean;
  trackInventory?: boolean;
  tagIds?: number[];
  pageIndex: number;
  pageSize: number;
  sortBy?: string;
  sortDescending: boolean;
}
