import { ContactType } from "../../enums/contact-type";

export interface CustomerContact {
  customerId: number;
  contactType: ContactType;
  salutation: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  mobileNumber: string;

  isPrimary: boolean;
  isActive: boolean;
}
