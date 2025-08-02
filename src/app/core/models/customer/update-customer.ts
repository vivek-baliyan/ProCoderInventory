import { CustomerType } from "../../../modules/features/customer/enums";

export interface UpdateCustomer {
  id: number;
  rowVersion: string;
  customerType: CustomerType;
  salutation: string;
  firstName: string;
  lastName: string;
  customerName: string;
  companyName?: string;
  email: string;
  workPhone?: string;
  mobile?: string;
  websiteUrl?: string;
  
  // Billing Address Information
  billingAddress?: string;
  billingAddressLine2?: string;
  billingCity?: string;
  billingStateId?: number;
  billingCountryId?: number;
  billingPostalCode?: string;
  
  // Shipping Address Information
  shippingAddress?: string;
  shippingAddressLine2?: string;
  shippingCity?: string;
  shippingStateId?: number;
  shippingCountryId?: number;
  shippingPostalCode?: string;
  
  // Business Settings
  creditLimit?: number;
  paymentTermDays?: string;
  isActive: boolean;
  panNumber?: string;
  currencyId?: number;
  priceListId?: number;
  
  // Additional Information
  notes?: string;
  allowBackOrders?: boolean;
  sendStatements?: boolean;
}