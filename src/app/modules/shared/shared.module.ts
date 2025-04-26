import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SettingsModalComponent } from './components/settings-modal/settings-modal.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImageUploaderComponent } from './components/image-uploader/image-uploaded.component';
import { FormsModule } from '@angular/forms';
import { ImageCropperComponent } from './components/image-cropper/image-cropper.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    SettingsModalComponent,
    ImageUploaderComponent,
    ImageCropperComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BsDropdownModule,
    ModalModule,
    CollapseModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    HeaderComponent,
    SidebarComponent,
    SettingsModalComponent,
    ImageUploaderComponent,
    ImageCropperComponent,
  ],
})
export class SharedModule {}
