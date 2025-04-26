import { CategoryImage } from './category-image';

export interface Category {
  id: number;
  userId: string;
  name: string;
  pageTitle: string;
  urlIdentifier: string;
  description: string;
  parentCategoryId?: number;
  status: string;
  publishDate?: Date;

  parentCategory?: Category;
  childCategories?: Category[];
  categoryImages?: CategoryImage[];
}
