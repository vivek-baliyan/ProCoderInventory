// src/app/core/guards/redirect-if-authenticated.guard.ts
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

export const loggedInGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    router.navigate(['/dashboard']); // Redirect to dashboard if logged in
    return false;
  }

  return true; // Allow access to signin/signup if not logged in
};
