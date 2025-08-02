import { AddressType } from "../../enums/address-type";

export interface CustomerAddress {
  id: number;
  customerId: number;
  addressType: AddressType;

  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateId?: number;
  countryId?: number;
  postalCode: string;

  isPrimary?: boolean;
  isActive?: boolean;

  createdOn?: Date;
  modifiedOn?: Date;
}
