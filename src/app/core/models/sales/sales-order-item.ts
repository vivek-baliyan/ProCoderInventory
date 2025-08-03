export interface SalesOrderItem {
  id: number;
  salesOrderId: number;
  productId: number;
  productName?: string;
  productSku?: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  discountPercentage: number;
  discountAmount: number;
  taxAmount: number;
  lineTotal: number;
  isActive: boolean;
}