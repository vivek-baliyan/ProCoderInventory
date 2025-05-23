import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';

export const isLoggedOutGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    router.navigate(['/app/dashboard']); // Redirect to dashboard if logged in
    return false;
  }

  return true; // Allow access to signin/signup if not logged in
};
