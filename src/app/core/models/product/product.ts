import { ProductImage } from './product-image';
import { ProductTag } from './product-tag';

export interface Product {
  id: number;
  sku?: string;
  name: string;
  description?: string;
  productType: number;
  status: number;
  isActive: boolean;
  isTaxable: boolean;
  trackInventory: boolean;
  serialNumberTracking: boolean;
  batchTracking: boolean;
  manufacturerPartNumber?: string;
  upc?: string;
  ean?: string;
  isbn?: string;
  sellingPrice?: number;
  costPrice?: number;
  images?: ProductImage[];
  tags?: ProductTag[];
}
