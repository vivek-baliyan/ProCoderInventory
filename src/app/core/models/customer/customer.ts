import { CustomerType } from "../../../modules/features/customer/enums/customer-type.enum";
import { CustomerContact } from "./customer-contact";
import { CustomerAddress } from "./customer-address";
import { CustomerTaxInfo } from "./customer-tax-info";
import { CustomerFinancial } from "./customer-financial";

export interface Customer {
  id: number;
  customerCode?: string;
  displayName: string;
  companyName?: string;
  websiteUrl?: string;
  customerType: CustomerType;
  status: string;

  financial?: CustomerFinancial;

  currencyId?: number;
  currencyName?: string;
  currencySymbol?: string;

  priceListId?: number;
  priceListName?: string;

  allowBackOrders?: boolean;
  sendStatements?: boolean;

  isActive: boolean;
  organisationId: number;

  contactPersons: CustomerContact[];
  addresses: CustomerAddress[];
  taxInfos: CustomerTaxInfo[];

  primaryContact?: CustomerContact;
  billingAddress?: CustomerAddress;
  shippingAddress?: CustomerAddress;
  taxNumber?: string;
  gstNumber?: string;
  panNumber?: string;
}