export interface User {
  id: number;
  name: string;
  password: string;
  username: string;
  email: string;
  cart: ProductCart[];
  wishlist: number[];
}

export interface ProductCart {
  id: number;
  quantity: number;
}
