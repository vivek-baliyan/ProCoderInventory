import { NgModule } from '@angular/core';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './services/auth.interceptor';

@NgModule({
  declarations: [SigninComponent, SignupComponent],
  providers: [provideHttpClient(withInterceptors([authInterceptor]))],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule],
  exports: [SigninComponent, SignupComponent],
})
export class AuthModule {}
