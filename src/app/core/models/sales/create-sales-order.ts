import { SalesOrderItem } from './sales-order-item';

export interface CreateSalesOrder {
  customerId: number;
  customerName?: string;
  orderNumber?: string;
  referenceNumber?: string;
  orderDate: Date;
  expectedShipmentDate?: Date;
  paymentTerms?: string;
  deliveryMethod?: string;
  salespersonId?: number;
  salespersonName?: string;
  
  // Order Items
  items: CreateSalesOrderItem[];
  
  // Financial
  subtotal: number;
  shippingCharges: number;
  adjustment: number;
  totalAmount: number;
  totalQuantity: number;
  
  // Additional Information
  customerNotes?: string;
  termsAndConditions?: string;
  
  // Documents
  documents?: File[];
  
  // Status
  status: 'DRAFT' | 'SENT' | 'CONFIRMED' | 'CANCELLED';
}

export interface CreateSalesOrderItem {
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
}