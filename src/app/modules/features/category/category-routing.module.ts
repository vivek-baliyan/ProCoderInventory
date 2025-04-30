import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { categoryResolver } from '../../../core/resolvers/category.resolver';

const routes: Routes = [
  {
    path: 'add',
    component: CategoryAddComponent,
  },
  {
    path: 'list',
    component: CategoryListComponent,
  },
  {
    path: 'edit/:id',
    component: CategoryEditComponent,
    resolve: { category: categoryResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
