export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string;
  slug: string;
  category: {
    _id: string;
  name: string;
  price: number;
  description: string;
  images: string;
  }
}
