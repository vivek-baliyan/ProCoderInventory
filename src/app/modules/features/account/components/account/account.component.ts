import { Component, OnInit } from '@angular/core';
import { LoggedInUserData } from '../../../../../core/models/user/logged-in-user-data';
import { AuthService } from '../../../../auth/services/auth.service';
import { AccountService } from '../../services/account.service';
import { Observable } from 'rxjs';
import { NotificationService } from '../../../../../core/services/notification.service';
import { UpdateLoginDetails } from '../../../../../core/models/user/update-login-details';
import { UserLogin } from '../../../../../core/models/user/user-login';
import { UpdateProfile } from '../../../../../core/models/user/update-profile';
import { User } from '../../../../../core/models/user/user';

@Component({
  selector: 'app-account',
  standalone: false,
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
  userObservable$!: Observable<LoggedInUserData>;
  isLoggedIn = false;
  loggedInUserData!: LoggedInUserData;
  userData!: User;

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // Subscribe to user data
    this.userObservable$ = this.authService.currentUser$;

    this.userObservable$.subscribe((userData) => {
      this.loggedInUserData = userData;
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
    this.accountService
      .getAccountByUserId(this.loggedInUserData.userId!)
      .subscribe({
        next: (response) => {
          this.userData = response.data;
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
