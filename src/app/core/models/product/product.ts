import { Category } from '../category/category';
import { ProductImage } from './product-image';
import { ProductVariant } from './product-variant';

export interface Product {
  id: number;
  name: string;
  pageTitle: string;
  urlIdentifier: string;
  description: string;
  oldPrice?: number;
  price: number;
  coupon: string;
  status: string;
  publishDate?: Date;
  publishTime?: Date;
  sku: string;
  stockQuantity: number;
  categories: Category[];
  tags: string[];
  hasSizeXS: boolean;
  hasSizeS: boolean;
  hasSizeM: boolean;
  hasSizeL: boolean;
  hasSizeXL: boolean;
  variants: ProductVariant[];
  images: ProductImage[];
  createdAt: Date;
  updatedAt?: Date | null;
}
