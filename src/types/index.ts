export interface Dish {
  id: string;
  name: string;
  category: 'chinese' | 'western' | 'korean' | 'japanese' | 'other';
  description: string;
  image: string;
  difficulty: 'easy' | 'medium' | 'hard';
  cookTime: number;
  ingredients: string[];
  steps: string[];
  tips?: string;
}

export interface OrderItem {
  dishId: string;
  dish: Dish;
  quantity: number;
  note?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  from: 'boyfriend' | 'girlfriend';
  to: 'boyfriend' | 'girlfriend';
  status: 'pending' | 'cooking' | 'ready' | 'completed';
  createdAt: Date;
  completedAt?: Date;
}

export interface Review {
  id: string;
  orderId: string;
  dishId: string;
  rating: number;
  comment: string;
  reviewer: 'boyfriend' | 'girlfriend';
  createdAt: Date;
}

export interface MealRecord {
  id: string;
  date: Date;
  mealType: 'breakfast' | 'lunch' | 'dinner';
  order: Order;
  review?: Review;
}

export type UserRole = 'boyfriend' | 'girlfriend';

export interface AppState {
  currentUser: UserRole;
  orders: Order[];
  reviews: Review[];
  mealRecords: MealRecord[];
}
