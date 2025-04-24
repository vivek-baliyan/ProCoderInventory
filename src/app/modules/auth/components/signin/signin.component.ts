import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../../core/services/notification.service';
import { AuthService } from '../../services/auth.service';
import { UserLogin } from '../../../../core/models/user/user-login';

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
    private route: ActivatedRoute,
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
    if (this.form.invalid) {
      this.notificationService.showError('Please fill in all required fields.');
      return;
    }

    let userLogin: UserLogin = {
      email: this.form.value.email!,
      password: this.form.value.password!,
      rememberMe: false,
    };

    this.authService.signin(userLogin).subscribe({
      next: (_) => {
        this.notificationService.showSuccess('Login successful!');

        const returnUrl =
          this.route.snapshot.queryParams['returnUrl'] || '/app/dashboard';
        this.router.navigateByUrl(returnUrl);
      },
    });
  }
}
