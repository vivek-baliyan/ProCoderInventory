import { Component, OnInit } from '@angular/core';
import { LoggedInUserData } from '../../../../../core/models/loggedInUserData';
import { AuthService } from '../../../../auth/services/auth.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-account',
  standalone: false,
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
  isLoggedIn = false;
  userData: LoggedInUserData | null = null;
  userProfileData: any = null;

  constructor(
    private authService: AuthService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    // Subscribe to user data
    this.authService.currentUser$.subscribe((userData) => {
      this.userData = userData;
    });

    // Check if user is logged in
    this.authService.isAuthenticated$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    if (this.isLoggedIn) {
      this.accountService.getAccountByUserId(this.userData?.userId!).subscribe({
        next: (response) => {
          this.userProfileData = response;
        },
        error: (error) => {
          console.error('Error fetching user profile data:', error);
        },
      });
    }
  }
}
