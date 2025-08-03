import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SettingsModalComponent } from './components/settings-modal/settings-modal.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImageUploaderComponent } from './components/image-uploader/image-uploader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperComponent } from './components/image-cropper/image-cropper.component';
import { ContactPersonsComponent } from './components/contact-persons/contact-persons.component';
import { DocumentUploadComponent } from './components/document-upload/document-upload.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    SettingsModalComponent,
    ImageUploaderComponent,
    ImageCropperComponent,
    ContactPersonsComponent,
    DocumentUploadComponent,
    AutocompleteComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
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
    ContactPersonsComponent,
    DocumentUploadComponent,
    AutocompleteComponent,
  ],
})
export class SharedModule {}
