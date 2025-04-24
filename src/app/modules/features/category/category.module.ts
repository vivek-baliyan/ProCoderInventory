import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageCropperComponent } from 'ngx-image-cropper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { FileInputDirective } from '@ngx-dropzone/cdk';
import { MatDropzone } from '@ngx-dropzone/material';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { MatChipRow } from '@angular/material/chips';

@NgModule({
  declarations: [CategoryAddComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ImageCropperComponent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatIcon,
    MatChipRow,
    MatDropzone,
    FileInputDirective,
  ],
})
export class CategoryModule {}
