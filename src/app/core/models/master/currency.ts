export interface Currency {
  id: number;
  name: string;
  code: string;
  symbol?: string;
  isDefault?: boolean;
}