import { ProductImage } from './product-image';
import { ProductTag } from './product-tag';

export interface Product {
  id: number;
  sku?: string;
  name: string;
  productType: number;
  status: number;
  isReturnable: boolean;
  trackInventory: boolean;
  manufacturerPartNumber?: string;
  upc?: string;
  ean?: string;
  isbn?: string;
  sellingPrice?: number;
  costPrice?: number;
  images?: ProductImage[];
  tags?: ProductTag[];
  
  // Additional properties from API
  itemGroupId?: number;
  brandId?: number;
  salesAccountId?: number;
  purchaseAccountId?: number;
  inventoryAccountId?: number;
  unitOfMeasureId?: number;
  reorderLevel?: number;
  openingStock?: number;
  openingStockValue?: number;
  vendorId?: number;
  weight?: number;
  weightUnitId?: number;
  length?: number;
  width?: number;
  height?: number;
  dimensionUnitId?: number;
  organisationId?: number;
  createdBy?: string;
  modifiedBy?: string;
  createdOn?: string;
  modifiedOn?: string;
}
