import { ProductType } from '../../enums/product-type.enum';
import { ProductStatus } from '../../enums/product-status.enum';

export interface CreateProduct {
  sku: string | null;
  name: string;
  description: string | null;
  productType: ProductType;
  status: ProductStatus;
  isActive: boolean;
  isTaxable: boolean;
  trackInventory: boolean;
  serialNumberTracking: boolean;
  batchTracking: boolean;
  itemGroupId: number | null;
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
  categoryIds: number[] | null;
  tags: string[] | null;
  customFields: string | null;
  
  // Additional Zoho Inventory inspired fields
  unitOfMeasurement: string | null;
  hsnSacCode: string | null;
  salesDescription: string | null;
  purchaseDescription: string | null;
  openingStock: number | null;
  openingStockValue: number | null;
  reorderLevel: number | null;
  preferredVendorId: number | null;
  warehouseId: number | null;
}
