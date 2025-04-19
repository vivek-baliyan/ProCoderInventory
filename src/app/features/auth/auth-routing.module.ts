// src/app/features/auth/auth-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { loggedInGuard } from '../../core/guards/logged-in.guard';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [loggedInGuard], // Prevent access if already logged in
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [loggedInGuard], // Prevent access if already logged in
  },
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
