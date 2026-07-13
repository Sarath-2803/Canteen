// User types
export type UserRole = "customer" | "admin" | "Customer" | "Admin";

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRole;
}

export interface Item{
    id: string;
    name: string;
    description: string;
    price: number;
    categoryId: string;
    imageUrl: string;
    available: boolean;
}

// Cart types
export interface CartItem {
  id: string;
  userId: string;
  itemId: string;
  quantity: number;
  item: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    available: boolean;
  };
}

// Order types
export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export type OrderStatus = "pending" | "completed" | "canceled" | "refunded";

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Payment types
export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  transactionId?: string;
  createdAt: Date;
  lastFour?: string;
}

// Payment Service types
export interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholder: string;
}

export interface UpiDetails {
  upiId: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  message: string;
}

// Menu Item types
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  imageUrl: string;
  available: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Admin types
export interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;
}

export interface AdminOrder {
  id: string;
  userId: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

// Payment method types
export type PaymentMethod = "card" | "upi";

// Test card types
export interface TestCard {
  number: string;
  expiry: string;
  cvv: string;
  name: string;
}

export interface TestUpi {
  id: string;
  description: string;
}

export interface UpiProvider {
  name: string;
  suffix: string;
}