import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CategoryAddComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoryRoutingModule,
    SharedModule,
  ],
})
export class CategoryModule {}
