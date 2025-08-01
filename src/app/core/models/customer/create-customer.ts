import { CustomerType } from "../../../modules/features/customer/enums/customer-type.enum";
import { ContactPerson } from "./contact-person";
import { CustomerAddress } from "./customer-address";

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
  contactPersons?: ContactPerson[];
  
  // Documents
  documents?: File[];
}