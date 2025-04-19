import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor(private httpClient: HttpClient) {}

  setAuthState(isAuth: boolean) {
    this.isAuthenticated.next(isAuth);
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    this.isAuthenticated.next(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  signup(data: any) {
    return this.httpClient.post(
      `${environment.apiBaseUrl}/Account/register`,
      data
    );
  }

  signin(data: any) {
    return this.httpClient.post(
      `${environment.apiBaseUrl}/Account/login`,
      data
    );
  }
}
