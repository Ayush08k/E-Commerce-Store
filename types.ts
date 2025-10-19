// FIX: Defined the Review interface and removed the circular self-import which was causing errors.
export interface Review {
  id: string;
  productId: string;
  rating: number;
  text: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: 'new' | 'popular' | 'best' | 'none';
  demographic: 'women' | 'men' | 'girl' | 'boy';
  productType: 'saree' | 'kurta' | 'lehenga' | 'suit' | 'sherwani';
}

export interface CartItem extends Product {
  quantity: number;
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  status: OrderStatus;
  date: string;
  items: CartItem[];
  total: number;
}