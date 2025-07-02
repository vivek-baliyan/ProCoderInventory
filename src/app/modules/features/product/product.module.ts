import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccordionComponent, AccordionPanelComponent } from 'ngx-bootstrap/accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductVariantAddComponent } from './components/product-variant-add/product-variant-add.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductGridComponent } from './components/product-grid/product-grid.component';


@NgModule({
  declarations: [
    ProductAddComponent,
    ProductVariantAddComponent,
    ProductSearchComponent,
    ProductListComponent,
    ProductGridComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    SharedModule,
    CollapseModule,
    AccordionComponent,
    AccordionPanelComponent,
  ],
})
export class ProductModule {}
