export interface ProductFilter {
  categoryIds: number[];
  size: string[];
  color: string[];
  priceRange: {
    minPrice: number;
    maxPrice: number;
  };
  rating: number;
  pageIndex: number;
  pageSize: number;
}
