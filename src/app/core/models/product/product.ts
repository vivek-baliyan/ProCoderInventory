// public record ProductDto
// {
//     public int Id { get; set; }
//     public string Name { get; set; }
//     public string PageTitle { get; set; }
//     public string UrlIdentifier { get; set; }
//     public string Description { get; set; }
//     public decimal? OldPrice { get; set; }
//     public decimal Price { get; set; }
//     public string Coupon { get; set; }
//     public string Status { get; set; }
//     public DateTime? PublishDate { get; set; }
//     public TimeSpan? PublishTime { get; set; }
//     public string SKU { get; set; }
//     public int StockQuantity { get; set; }
//     public List<CategoryDto> Categories { get; set; } = [];
//     public List<string> Tags { get; set; } = [];
//     public bool HasSizeXS { get; set; }
//     public bool HasSizeS { get; set; }
//     public bool HasSizeM { get; set; }
//     public bool HasSizeL { get; set; }
//     public bool HasSizeXL { get; set; }
//     public List<ProductVariantDto> Variants { get; set; } = [];
//     public List<ProductImageDto> Images { get; set; } = [];
//     public DateTime CreatedAt { get; set; }
//     public DateTime? UpdatedAt { get; set; }
// }

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



