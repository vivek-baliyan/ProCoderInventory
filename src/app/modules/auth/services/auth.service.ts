import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoggedInUserData } from '../../../core/models/user/logged-in-user-data';
import { ApiResponse } from '../../../core/models/api-response';
import { UserLogin } from '../../../core/models/user/user-login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(this.hasToken());
  private currentUser = new BehaviorSubject<LoggedInUserData>(
    this.getUserFromStorage()
  );

  public isAuthenticated$ = this.isAuthenticated.asObservable();
  public currentUser$ = this.currentUser.asObservable();

  constructor(private httpClient: HttpClient) {
    // Check if user is already logged in
    this.loadUserFromStorage();
  }

  setAuthState(isAuth: boolean) {
    this.isAuthenticated.next(isAuth);
  }

  signout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    this.isAuthenticated.next(false);
    this.currentUser.next({} as LoggedInUserData);
  }

  signup(data: any) {
    return this.httpClient.post(
      `${environment.apiBaseUrl}/Account/register`,
      data
    );
  }

  signin(credentials: UserLogin): Observable<ApiResponse<LoggedInUserData>> {
    return this.httpClient
      .post<ApiResponse<LoggedInUserData>>(
        `${environment.apiBaseUrl}/Account/login`,
        credentials
      )
      .pipe(
        tap((response) => {
          // Save token and user data
          localStorage.setItem('authToken', response.data.accessToken);
          localStorage.setItem('userData', JSON.stringify(response.data));

          // Update observables
          this.isAuthenticated.next(true);
          this.currentUser.next(response.data);
        })
      );
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  private getUserFromStorage(): any {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  private loadUserFromStorage(): void {
    const token = localStorage.getItem('authToken');
    const userData = this.getUserFromStorage();

    if (token && userData) {
      this.isAuthenticated.next(true);
      this.currentUser.next(userData);
    }
  }
}
