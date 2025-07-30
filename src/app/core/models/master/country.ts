export interface Country {
  id: number;
  name: string;
  code: string;
  region?: string;
  currencyCode?: string;
  currencyName?: string;
}