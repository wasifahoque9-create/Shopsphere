import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;

// Auth endpoints
export const authAPI = {
  register: (data: RegisterData) => api.post('/auth/register', data),
  login: (data: LoginData) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data: ResetPasswordData) => api.post('/auth/reset-password', data),
  verifyOtp: (data: { email: string; otp: string }) => api.post('/auth/verify-otp', data),
  me: () => api.get('/auth/me'),
};

// Customer endpoints
export const customerAPI = {
  getProfile: () => api.get('/customer/profile'),
  updateProfile: (data: FormData) => api.post('/customer/profile', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  changePassword: (data: ChangePasswordData) => api.put('/customer/change-password', data),
  getOrders: () => api.get('/customer/orders'),
  getOrderById: (id: number) => api.get(`/customer/orders/${id}`),
  downloadInvoice: (id: number) => api.get(`/customer/orders/${id}/invoice`, { responseType: 'blob' }),
  getReviews: () => api.get('/customer/reviews'),
  submitReview: (data: ReviewData) => api.post('/customer/reviews', data),
};

// Types
export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ResetPasswordData {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ProfileData {
  name: string;
  email: string;
  phone: string;
  gender?: string;
  address?: string;
}

export interface ChangePasswordData {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface ReviewData {
  product_id: number;
  rating: number;
  comment: string;
}
