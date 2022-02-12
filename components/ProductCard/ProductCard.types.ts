export type Product = {
  name: string;
  image: string;
  price: number;
  rating: number;
  author: string;
  id?: number;
};

export interface ProductCardProps {
  product: Product;
}
