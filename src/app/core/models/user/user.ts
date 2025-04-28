export interface User {
  id: string;
  email: string;
  phoneNumber: string;
  userName: string;
  firstName: string;
  lastName: string;
  profileImageUrl: string;
  dateOfBirth?: Date | null;
  country: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  bio: string;
  isDeleted: boolean;
  lastLogin?: Date | null;
  lastLoginDevice: string;
  lastPasswordChange?: Date | null;
  roles?: string[];
}
