export interface ProductFilter {
  categoryIds: number[];
  size: string[];
  color: string[];
  priceRange: {
    min: number;
    max: number;
  };
  rating: number;
  pageIndex: number;
  pageSize: number;
}
