import { ProductType } from '../../enums/product-type.enum';
import { ProductStatus } from '../../enums/product-status.enum';

export interface UpdateProduct {
  id: number;
  sku: string | null;
  name: string;
  productType: ProductType;
  trackInventory: boolean;
  brandId: number | null;
  manufacturerPartNumber: string | null;
  upc: string | null;
  ean: string | null;
  isbn: string | null;
  sellingPrice: number | null;
  costPrice: number | null;
  salesAccountId: number | null;
  purchaseAccountId: number | null;
  inventoryAccountId: number | null;
  unitOfMeasureId: number | null;
  reorderLevel: number | null;
  openingStock: number | null;
  openingStockValue: number | null;
  isReturnable: boolean;
  vendorId: number | null;
  weight: number | null;
  weightUnitId: number | null;
  length: number | null;
  width: number | null;
  height: number | null;
  dimensionUnitId: number | null;
}