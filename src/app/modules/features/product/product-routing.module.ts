import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { productResolver } from '../../../core/resolvers/product.resolver';
import { ProductEditComponent } from './components/product-edit/product-edit.component';

const routes: Routes = [
  {
    path: 'add',
    component: ProductAddComponent,
  },
  {
    path: 'list',
    component: ProductSearchComponent,
  },
  {
    path: 'view/:id',
    component: ProductViewComponent,
    resolve: { product: productResolver },
  },
  {
    path: 'edit/:id',
    component: ProductEditComponent,
    resolve: { product: productResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
