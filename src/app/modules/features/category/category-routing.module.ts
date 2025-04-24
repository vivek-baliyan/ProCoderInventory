import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryListComponent } from './components/category-list/category-list.component';

const routes: Routes = [
  {
    path: 'add',
    component: CategoryAddComponent,
  },
  {
    path: 'list',
    component: CategoryListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
