import { CustomerType } from "../../../modules/features/customer/enums/customer-type.enum";
import { CustomerContact } from "./customer-contact";
import { CustomerAddress } from "./customer-address";

export interface CreateCustomer {
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
  
  billingAddress: CustomerAddress;
  
  shippingAddress?: CustomerAddress;
  
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
  contactPersons?: CustomerContact[];
  
  // Documents
  documents?: File[];
}