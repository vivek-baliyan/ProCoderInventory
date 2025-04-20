import { NgModule } from '@angular/core';
import { SigninComponent } from './components/signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    SigninComponent,
    SignupComponent,
    ForgotPasswordComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, AuthRoutingModule],
  exports: [],
})
export class AuthModule {}
