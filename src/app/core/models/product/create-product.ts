import { CreateProductVariant } from './create-product-variant';

export interface CreateProduct {
  name: string;
  pageTitle: string;
  urlIdentifier: string;
  description: string;
  oldPrice: number | null;
  price: number;
  coupon: string;
  status: string;
  publishDate: Date | null;
  publishTime: Date | null;
  sku: string;
  stockQuantity: number;
  categoryId: number;
  tags: string[];
  sizes: string[];
  variants: CreateProductVariant[];
}
