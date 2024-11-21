export interface Reward {
  id: number;
  discount: string;
  discountCode?: string;
  category: string;
  cost: number;
  details: string;
  expiration: string;
}
