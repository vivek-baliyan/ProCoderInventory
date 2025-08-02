import { CustomerType } from "../../../modules/features/customer/enums";

export interface Customer {
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
  city?: string;
  stateId?: number;
  countryId?: number;
  postalCode?: string;
  
  // Shipping Address Information
  shippingAddress?: string;
  
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
  
  // Audit fields
  createdOn?: Date;
  modifiedOn?: Date;
  createdBy?: string;
  modifiedBy?: string;
}