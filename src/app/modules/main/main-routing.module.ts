import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from '../../core/guards/is-authenticated.guard';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [isAuthenticatedGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../features/account/account.module').then(
            (m) => m.AccountModule
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('../features/product/product.module').then(
            (m) => m.ProductModule
          ),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('../features/category/category.module').then(
            (m) => m.CategoryModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
