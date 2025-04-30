import { CreateCategory } from './create-category';

export interface UpdateCategory extends CreateCategory {
  categoryId: number;
}
