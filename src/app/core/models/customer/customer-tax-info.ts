import { TaxType } from "../../enums/tax-type";

export interface CustomerTaxInfo {
  id: number;
  customerId: number;
  taxType: TaxType;
  taxNumber: string;
  isActive: boolean;
  createdOn?: Date;
  modifiedOn?: Date;
}