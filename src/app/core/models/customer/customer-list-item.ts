export interface CustomerListItem {
  id: number;
  customerName: string;
  displayName?: string;
  companyName?: string;
  customerType: 'Individual' | 'Business';
  email: string;
  phone?: string;
  city?: string;
  countryName?: string;
  status: 'ACTIVE' | 'INACTIVE';
  creditLimit?: number;
  totalOrders?: number;
  totalSpent?: number;
  lastOrderDate?: Date;
  createdOn?: Date;
}