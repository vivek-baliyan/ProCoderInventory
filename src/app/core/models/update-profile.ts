export interface UpdateProfile {
  profileId: number;
  userId: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  profileImageUrl: string;
  bio: string;
  dateOfBirth: string;
}