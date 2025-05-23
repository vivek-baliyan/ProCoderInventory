import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './components/account/account.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthSettingsComponent } from './components/auth-settings/auth-settings.component';
import { NotificationSettingsComponent } from './components/notification-settings/notification-settings.component';
import { PaymentSettingsComponent } from './components/payment-settings/payment-settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrganisationComponent } from './components/organisation/organisation.component';

@NgModule({
  declarations: [
    AccountComponent,
    AuthSettingsComponent,
    ProfileComponent,
    OrganisationComponent,
    PaymentSettingsComponent,
    NotificationSettingsComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, AccountRoutingModule],
})
export class AccountModule {}
