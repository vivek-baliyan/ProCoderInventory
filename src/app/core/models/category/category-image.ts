export interface CategoryImage {
  categoryId: number;
  image: string;
  imagePath: string;
  altText: string;

  // Properties for cropped image data
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;

  // Aspect ratio used for cropping
  aspectRatio: string;

  isPrimary: boolean;
}