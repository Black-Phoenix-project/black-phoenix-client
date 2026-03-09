// ─── Auth ────────────────────────────────────────────────────────────────────
export interface User {
  id: string;
  phoneNumber: string | number;
  fullName: string | null;
  image: string | null;
  role?: string[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginPayload {
  phoneNumber: string;
  password: string;
}

export interface RegisterPayload {
  phoneNumber: string;
  password: string;
  fullName?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

// ─── Product ─────────────────────────────────────────────────────────────────
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  stock?: number;
  status?: "active" | "inactive" | "out_of_stock";
  category?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductsResponse {
  products?: Product[];
  data?: Product[];
  total?: number;
  page?: number;
  pages?: number;
}

// ─── Swiper ──────────────────────────────────────────────────────────────────
export interface SwiperSlide {
  _id: string;
  title?: string;
  description?: string;
  image: string;
  link?: string;
  order?: number;
  createdAt?: string;
}

// ─── Order ───────────────────────────────────────────────────────────────────
export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  _id: string;
  phoneNumber: string;
  username: string;
  description?: string;
  product: OrderItem;
  totalAmount: number;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  paymentStatus: "unpaid" | "paid" | "refunded";
  userId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderPayload {
  username: string;
  phoneNumber: string;
  description?: string;
  product: Omit<OrderItem, "productName" | "image"> & {
    productName: string;
    image?: string;
  };
  userId?: string;
  notes?: string;
}

// ─── Cart ────────────────────────────────────────────────────────────────────
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

// ─── Likes ───────────────────────────────────────────────────────────────────
export interface Like {
  _id: string;
  userId: string;
  productId: string | Product;
  createdAt?: string;
}

export interface LikeResponse {
  success: boolean;
  liked: boolean;
  message: string;
  data?: Like;
}

// ─── API ─────────────────────────────────────────────────────────────────────
export interface ApiError {
  message: string;
  statusCode?: number;
}
