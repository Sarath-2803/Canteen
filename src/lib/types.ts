// ====================
// API RESPONSE TYPES
// ====================

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}


// ====================
// USER TYPES
// ====================

export type UserRole = "customer" | "admin";

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}


// ====================
// CATEGORY TYPES
// ====================

export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
}


// ====================
// ITEM TYPES
// ====================

export interface Item {
  itemId: string;
  itemName: string;
  itemDescription: string;
  price: number;
  categoryId: string;
  imageUrl?: string;
  stockQuantity: number;
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateItemRequest {
  itemName: string;
  itemDescription: string;
  price: number;
  categoryId: string;
  stockQuantity: number;
  image?: File;
}

export interface UpdateItemRequest {
  itemName?: string;
  itemDescription?: string;
  price?: number;
  categoryId?: string;
  stockQuantity?: number;
  isAvailable?: boolean;
  image?: File;
}


// ====================
// CART TYPES
// ====================

export interface Cart {
  cartId: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  cartItemId: string;
  cartId: string;
  itemId: string;
  quantity: number;
  item?: {
    itemId: string;
    itemName: string;
    price: number;
    imageUrl?: string;
    isAvailable: boolean;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface AddToCartRequest {
  cartId: string;
  itemId: string;
  quantity: number;
}


// ====================
// ORDER TYPES
// ====================

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled";

export interface Order {
  id: string;
  userId: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  itemId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  item?: Item;
}

export interface CheckoutRequest {
  paymentMethod: string;
}


// ====================
// PAYMENT TYPES
// ====================

export type PaymentStatus =
  | "pending"
  | "completed"
  | "failed";

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  status: PaymentStatus;
  transactionId?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreatePaymentOrderRequest {
  orderId: string;
  amount: number;
}

export interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}

export interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}


// ====================
// UI TYPES
// ====================

export interface SelectOption {
  label: string;
  value: string;
}

export interface TableColumn<T> {
  key: keyof T;
  title: string;
}

export interface LoadingState {
  loading: boolean;
  error?: string;
}