import { Component, OnInit } from '@angular/core';
import { LoggedInUserData } from '../../../../../core/models/loggedInUserData';
import { AuthService } from '../../../../auth/services/auth.service';
import { AccountService } from '../../services/account.service';
import { Observable } from 'rxjs';
import { UserProfileDetails } from '../../../../../core/models/userProfileDetails';

@Component({
  selector: 'app-account',
  standalone: false,
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
  userObservable$: Observable<LoggedInUserData | null> | undefined;
  isLoggedIn = false;
  userData: LoggedInUserData | null = null;
  userProfileData: UserProfileDetails | null = null;

  constructor(
    private authService: AuthService,
    private accountService: AccountService
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
      this.accountService.getAccountByUserId(this.userData?.userId!).subscribe({
        next: (response) => {
          this.userProfileData = response.data;
          console.log('User profile data:', this.userProfileData);
        },
        error: (error) => {
          console.error('Error fetching user profile data:', error);
        },
      });
    }
  }
}
