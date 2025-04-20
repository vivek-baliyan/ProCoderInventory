export interface LoggedInUserData {
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImageUrl: string;
  accessToken: string;
  refreshToken: string;
  userRoles: string[];
}
