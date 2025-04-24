export interface CreateCategory {
  userId: string;
  name: string;
  pageTitle: string;
  urlIdentifier: string;
  description: string;
  parentCategoryId: number | null;
  imagePath: string;
  status: number;
  publishDate: Date | null;
}
