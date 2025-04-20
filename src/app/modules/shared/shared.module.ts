import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SettingsModalComponent } from './components/settings-modal/settings-modal.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, SettingsModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule,
    ModalModule,
    CollapseModule,
  ],
  exports: [HeaderComponent, SidebarComponent, SettingsModalComponent],
})
export class SharedModule {}
