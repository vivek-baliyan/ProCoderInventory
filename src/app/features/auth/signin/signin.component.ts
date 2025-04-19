import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-signin',
  standalone: false,
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  get emailIsInValid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  get passwordIsInValid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  onSubmit() {
    this.authService.signin(this.form.value).subscribe({
      next: (response: any) => {
        // 1. Store auth token
        localStorage.setItem('authToken', response.token);

        // 2. Store any user data if needed
        localStorage.setItem('userData', JSON.stringify(response.user));

        // 3. Update authentication state (if using a state management service)
        this.authService.setAuthState(true);

        // 4. Show success message (if you have a notification service)
        this.notificationService.showSuccess('Login successful!');

        // 5. Navigate to the protected route (usually dashboard)
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        // Handle error (show error message)
        this.notificationService.showError('Login failed. Please try again.');
      },
    });
  }
}
