export type Product = {
  name: string;
  image: string;
  price: number;
  rating: number;
  author: string;
  id?: number;
  copyNumber: number;
};

export interface ProductCardProps {
  product: Product;
  hoverEffect: boolean;
  showBuyButton: boolean;
  to: string;
}
