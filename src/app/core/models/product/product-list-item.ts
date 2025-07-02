import { ProductImage } from './product-image';

export interface ProductListItem {
  id: number;
  name: string;
  price: number;
  coupon: string;
  status: string;
  sku: string;
  image: ProductImage;
}
