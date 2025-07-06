export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  addedBy: string;
  addedAt: Date;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  userId: string;
  userName: string;
  createdAt: Date;
}

export interface Wishlist {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  createdAt: Date;
  collaborators: string[];
  products: Product[];
  isPublic: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}