export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AIRecommendation {
  productId: number;
  reason: string;
}


