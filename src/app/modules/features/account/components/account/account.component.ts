import { Component, OnInit } from '@angular/core';
import { LoggedInUserData } from '../../../../../core/models/logged-in-user-data';
import { AuthService } from '../../../../auth/services/auth.service';
import { AccountService } from '../../services/account.service';
import { Observable } from 'rxjs';
import { UserProfileDetails } from '../../../../../core/models/user-profile-details';
import { UpdateProfileSettings } from '../../../../../core/models/update-profile-settings';
import { NotificationService } from '../../../../../core/services/notification.service';
import { UpdateLoginDetails } from '../../../../../core/models/update-login-details';
import { UserLogin } from '../../../../../core/models/user-login';
import { UpdateProfile } from '../../../../../core/models/update-profile';

@Component({
  selector: 'app-account',
  standalone: false,
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
  userObservable$!: Observable<LoggedInUserData>;
  isLoggedIn = false;
  userData!: LoggedInUserData;
  userProfileData!: UserProfileDetails;

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // Subscribe to user data
    this.userObservable$ = this.authService.currentUser$;

    this.userObservable$.subscribe((userData) => {
      this.userData = userData;
    });

    // Check if user is logged in
    this.authService.isAuthenticated$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    if (this.isLoggedIn) {
      this.getAccountByUserId();
    }
  }

  private getAccountByUserId() {
    this.accountService.getAccountByUserId(this.userData.userId!).subscribe({
      next: (response) => {
        this.userProfileData = response.data;
      },
    });
  }

  onProfileUpdate(updateProfile: UpdateProfile) {
    this.accountService.updateProfile(updateProfile).subscribe({
      next: (_) => {
        // Refresh the user profile data after update
        this.getAccountByUserId();
        this.notificationService.showSuccess('Profile updated successfully!');
      },
    });
  }

  onProfileSettingsUpdate(updatedProfile: UpdateProfileSettings) {
    this.accountService.updateProfileSettings(updatedProfile).subscribe({
      next: (_) => {
        // Refresh the user profile data after update
        this.getAccountByUserId();
        this.notificationService.showSuccess('Profile updated successfully!');
      },
    });
  }

  onLoginDetailUpdate(updatedLoginDetails: UpdateLoginDetails) {
    const userLogin: UserLogin = {
      email: updatedLoginDetails.email,
      password: updatedLoginDetails.newPassword,
      rememberMe: false,
    };

    this.accountService.updateLoginDetails(updatedLoginDetails).subscribe({
      next: (_) => {
        this.notificationService.showSuccess(
          'Login details updated successfully!'
        );

        // Refresh the user profile data after update
        this.authService.signin(userLogin).subscribe({
          next: (_) => {
            console.log('User logged in successfully!');
          },
        });
      },
    });
  }
}
