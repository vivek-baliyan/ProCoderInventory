import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';
import { NotificationService } from '../services/notification.service';

export const isAuthenticatedGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  if (authService.isLoggedIn()) {
    return true;
  }

  notificationService.showWarning('Please log in to access this page');

  const returnUrl = router.url;
  router.navigate(['/auth/signin'], { queryParams: { returnUrl } });
  return false;
};
