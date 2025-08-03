import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesOrderAddComponent } from './components/sales-order-add/sales-order-add.component';
import { SalesOrderEditComponent } from './components/sales-order-edit/sales-order-edit.component';
import { SalesOrderListComponent } from './components/sales-order-list/sales-order-list.component';
import { SalesOrderViewComponent } from './components/sales-order-view/sales-order-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'orders',
    pathMatch: 'full'
  },
  {
    path: 'orders',
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: SalesOrderListComponent,
        title: 'Sales Orders'
      },
      {
        path: 'add',
        component: SalesOrderAddComponent,
        title: 'New Sales Order'
      },
      {
        path: 'edit/:id',
        component: SalesOrderEditComponent,
        title: 'Edit Sales Order'
      },
      {
        path: 'view/:id',
        component: SalesOrderViewComponent,
        title: 'View Sales Order'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }