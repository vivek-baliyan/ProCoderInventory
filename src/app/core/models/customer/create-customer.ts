export interface CreateCustomer {
  customerName: string;
  displayName?: string;
  companyName?: string;
  customerType: 'Individual' | 'Business';
  email: string;
  phone?: string;
  mobile?: string;
  website?: string;
  
  // Address Information
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  stateId?: number;
  countryId?: number;
  postalCode?: string;
  
  // Business Settings
  creditLimit?: number;
  paymentTerms?: string;
  status: 'ACTIVE' | 'INACTIVE';
  taxId?: string;
  currencyId?: number;
  
  // Additional Information
  notes?: string;
  allowBackOrders?: boolean;
  sendStatements?: boolean;
}