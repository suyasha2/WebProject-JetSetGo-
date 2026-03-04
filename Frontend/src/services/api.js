import axios from 'axios';

// Base URL लाई generic राख्दा सबै रुटलाई काम गर्छ
const BASE_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  // --- AUTH SECTION ---
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data; 
  },

  resetPassword: async (id, password) => {
    const response = await api.post(`/auth/reset-password/${id}`, { password });
    return response.data;
  },

  adminLogin: (email, password) => {
    if (email === "admin@travel.com" && password === "admin123") {
      localStorage.setItem('role', 'admin');
      return { success: true, message: "Welcome to Admin Console" };
    }
    return { success: false, message: "Unauthorized: Access denied." };
  },

  // --- BOOKING SECTION ---
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings/add', bookingData);
    return response.data;
  },

  getUserBookings: async (email) => {
    const response = await api.get(`/bookings/my-bookings/${email}`);
    return response.data;
  },

  getAllBookings: async () => {
    const response = await api.get('/bookings/admin/all');
    return response.data;
  },

  addReview: async (reviewData) => {
    // reviewData मा { hotelId, userName, rating, comment } हुनुपर्छ
    const response = await api.post('/reviews/add', reviewData);
    return response.data;
  },

  getHotelReviews: async (hotelId) => {
    const response = await api.get(`/reviews/hotel/${hotelId}`);
    return response.data;
  },

  getAllReviews: async () => {
    const response = await api.get('/reviews/admin/all');
    return response.data;
  }
};

export default authService;