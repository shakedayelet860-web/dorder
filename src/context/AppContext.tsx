import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { Order, Review, MealRecord, UserRole, OrderItem } from '../types';

interface AppState {
  currentUser: UserRole;
  orders: Order[];
  reviews: Review[];
  mealRecords: MealRecord[];
  cart: OrderItem[];
}

type Action =
  | { type: 'SET_USER'; payload: UserRole }
  | { type: 'ADD_TO_CART'; payload: OrderItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_ITEM'; payload: { dishId: string; note: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'PLACE_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { orderId: string; status: Order['status'] } }
  | { type: 'ADD_REVIEW'; payload: Review }
  | { type: 'LOAD_STATE'; payload: AppState };

const initialState: AppState = {
  currentUser: 'boyfriend',
  orders: [],
  reviews: [],
  mealRecords: [],
  cart: []
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, currentUser: action.payload };
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.dishId === action.payload.dishId);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.dishId === action.payload.dishId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return { ...state, cart: [...state.cart, action.payload] };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.dishId !== action.payload)
      };
    case 'UPDATE_CART_ITEM':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.dishId === action.payload.dishId
            ? { ...item, note: action.payload.note }
            : item
        )
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'PLACE_ORDER': {
      const newOrder = action.payload;
      const mealRecord: MealRecord = {
        id: `meal_${Date.now()}`,
        date: new Date(),
        mealType: getMealType(),
        order: newOrder
      };
      return {
        ...state,
        orders: [newOrder, ...state.orders],
        mealRecords: [mealRecord, ...state.mealRecords],
        cart: []
      };
    }
    case 'UPDATE_ORDER_STATUS': {
      const updatedOrders = state.orders.map(order =>
        order.id === action.payload.orderId
          ? { ...order, status: action.payload.status, completedAt: action.payload.status === 'completed' ? new Date() : order.completedAt }
          : order
      );
      const updatedMealRecords = state.mealRecords.map(record =>
        record.order.id === action.payload.orderId
          ? { ...record, order: { ...record.order, status: action.payload.status } }
          : record
      );
      return {
        ...state,
        orders: updatedOrders,
        mealRecords: updatedMealRecords
      };
    }
    case 'ADD_REVIEW': {
      const newReview = action.payload;
      const updatedMealRecords = state.mealRecords.map(record =>
        record.order.id === newReview.orderId
          ? { ...record, review: newReview }
          : record
      );
      return {
        ...state,
        reviews: [newReview, ...state.reviews],
        mealRecords: updatedMealRecords
      };
    }
    case 'LOAD_STATE':
      return action.payload;
    default:
      return state;
  }
}

function getMealType(): 'breakfast' | 'lunch' | 'dinner' {
  const hour = new Date().getHours();
  if (hour < 11) return 'breakfast';
  if (hour < 17) return 'lunch';
  return 'dinner';
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const savedState = localStorage.getItem('coupleOrderApp');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', payload: parsed });
      } catch (e) {
        console.error('Failed to load saved state:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('coupleOrderApp', JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
