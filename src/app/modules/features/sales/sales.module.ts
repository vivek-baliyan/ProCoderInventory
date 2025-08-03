import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesOrderAddComponent } from './components/sales-order-add/sales-order-add.component';
import { SalesOrderEditComponent } from './components/sales-order-edit/sales-order-edit.component';
import { SalesOrderListComponent } from './components/sales-order-list/sales-order-list.component';
import { SalesOrderViewComponent } from './components/sales-order-view/sales-order-view.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    SalesOrderAddComponent,
    SalesOrderEditComponent,
    SalesOrderListComponent,
    SalesOrderViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SalesRoutingModule,
    SharedModule
  ]
})
export class SalesModule { }
