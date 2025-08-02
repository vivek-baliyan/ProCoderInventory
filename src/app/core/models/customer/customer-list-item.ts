import { CustomerType } from "../../../modules/features/customer/enums";

export interface CustomerListItem {
  id: number;
  customerCode?: string;
  customerName: string;
  displayName?: string;
  companyName?: string;
  contactPerson?: string;
  customerType: CustomerType;
  email: string;
  phoneNumber?: string;
  city?: string;
  state?: string;
  country?: string;
  status: 'ACTIVE' | 'INACTIVE';
  isActive?: boolean;
  creditLimit?: number;
  currencyName?: string;
  totalOrders?: number;
  totalSpent?: number;
  lastOrderDate?: Date;
  createdOn?: Date;
}