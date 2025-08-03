import { SalesOrderItem } from './sales-order-item';

export interface SalesOrder {
  id: number;
  customerId: number;
  customerName: string;
  orderNumber: string;
  referenceNumber?: string;
  orderDate: Date;
  expectedShipmentDate?: Date;
  paymentTerms?: string;
  deliveryMethod?: string;
  salespersonId?: number;
  salespersonName?: string;
  
  // Order Items
  items: SalesOrderItem[];
  
  // Financial
  subtotal: number;
  shippingCharges: number;
  adjustment: number;
  totalAmount: number;
  totalQuantity: number;
  
  // Additional Information
  customerNotes?: string;
  termsAndConditions?: string;
  
  // Status and Tracking
  status: 'DRAFT' | 'SENT' | 'CONFIRMED' | 'CANCELLED';
  createdDate: Date;
  modifiedDate?: Date;
  createdBy: string;
  modifiedBy?: string;
  
  // Documents
  documentUrls?: string[];
}