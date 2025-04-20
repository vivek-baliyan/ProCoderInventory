import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './components/account/account.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [AccountComponent, ProfileComponent],
  imports: [CommonModule, AccountRoutingModule],
})
export class AccountModule {}
