import { ProductImage } from './product-image';

export interface ProductListItem {
  id: number;
  name: string;
  sku?: string;
  description?: string;
  sellingPrice?: number;
  costPrice?: number;
  status: number;
  isActive: boolean;
  images?: ProductImage[];
}
