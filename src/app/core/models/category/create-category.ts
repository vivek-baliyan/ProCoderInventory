export interface CreateCategory {
  name: string;
  pageTitle: string;
  urlIdentifier: string;
  description: string;
  parentCategoryId: number | null;
  image: string;
  status: number;
  publishDateTime: Date | null;
}
