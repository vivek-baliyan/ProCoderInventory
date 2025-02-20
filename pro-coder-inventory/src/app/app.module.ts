import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProfileComponent,
    HeaderComponent,
    SidebarComponent,
    SettingsModalComponent,
  ],
  bootstrap: [AppComponent],
  providers: [provideAnimationsAsync(), BsModalService],
  imports: [AppRoutingModule, BrowserModule, BsDropdownModule, ModalModule],
})
export class AppModule {}
