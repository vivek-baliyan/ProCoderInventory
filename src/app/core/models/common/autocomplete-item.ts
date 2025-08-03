export interface AutocompleteItem<T = any> {
  value: number;
  label: string;
  description?: string;
  code?: string;
  data?: T;
}