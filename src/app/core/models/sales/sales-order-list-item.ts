export interface SalesOrderListItem {
  id: number;
  orderNumber: string;
  customerName: string;
  orderDate: Date;
  expectedShipmentDate?: Date;
  totalAmount: number;
  totalQuantity: number;
  status: 'DRAFT' | 'SENT' | 'CONFIRMED' | 'CANCELLED';
  createdDate: Date;
}