import { CreateSalesOrderItem } from './create-sales-order';

export interface UpdateSalesOrder {
  id: number;
  customerId: number;
  referenceNumber?: string;
  orderDate: Date;
  expectedShipmentDate?: Date;
  paymentTerms?: string;
  deliveryMethod?: string;
  salespersonId?: number;
  
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