import { CustomerType } from "../../../modules/features/customer/enums/customer-type.enum";

export interface Customer {
  id: number;
  rowVersion: string;
  customerType: CustomerType;
  salutation: string;
  firstName: string;
  lastName: string;
  displayName: string;
  companyName?: string;
  email: string;
  phoneNumber?: string;
  mobileNumber?: string;
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