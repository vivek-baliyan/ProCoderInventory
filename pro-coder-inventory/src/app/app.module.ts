import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SettingsModalComponent } from './components/settings-modal/settings-modal.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { routes } from './app.routes';
import { MenuItemComponent } from './components/sidebar/menu-item/menu-item.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProfileComponent,
    HeaderComponent,
    SidebarComponent,
    SettingsModalComponent,
    MenuItemComponent
  ],
  bootstrap: [AppComponent],
  providers: [provideAnimationsAsync(), BsModalService],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BsDropdownModule,
    ModalModule,
    CollapseModule,
  ],
})
export class AppModule {}
