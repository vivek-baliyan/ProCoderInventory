import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private notificationService: NotificationService) {}

  handleError(error: HttpErrorResponse, customMessage?: string): void {
    console.error('API Error:', error);
    let errorMessage = customMessage || 'An error occurred';

    if (error.status === 0) {
      errorMessage =
        'Cannot connect to the server. Please check your connection or try again later.';
    }
    if (error.error && typeof error.error === 'object') {
      const apiError = error.error as ApiResponse<null>;

      if (apiError.hasOwnProperty('errors')) {
        if (apiError.errors && apiError.errors.length > 0) {
          errorMessage = apiError.errors[0].description;
        } else if (apiError.message && apiError.message.trim() !== '') {
          errorMessage = apiError.message;
        }
      }
    }

    // Show toaster notification
    this.notificationService.showError(errorMessage);
  }
}
