import { CustomerType } from "../../../modules/features/customer/enums";

export interface CreateCustomer {
  customerType: CustomerType;
  salutation: string;
  firstName: string;
  lastName: string;
  displayName: string;
  companyName?: string;
  email: string;
  phone?: string;
  mobile?: string;
  website?: string;
  
  // Billing Address Information
  billingAddressLine1?: string;
  billingAddressLine2?: string;
  billingCity?: string;
  billingStateId?: number;
  billingCountryId?: number;
  billingPostalCode?: string;
  
  // Shipping Address Information
  shippingAddressLine1?: string;
  shippingAddressLine2?: string;
  shippingCity?: string;
  shippingStateId?: number;
  shippingCountryId?: number;
  shippingPostalCode?: string;
  
  // Business Settings
  creditLimit?: number;
  paymentTerms?: string;
  status: 'ACTIVE' | 'INACTIVE';
  pan?: string;
  currencyId?: number;
  priceListId?: number;
  
  // Additional Information
  allowBackOrders?: boolean;
  sendStatements?: boolean;
  
  // Contact Persons
  contactPersons?: ContactPerson[];
  
  // Documents
  documents?: File[];
}

export interface ContactPerson {
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  workPhone: string;
  mobile: string;
}