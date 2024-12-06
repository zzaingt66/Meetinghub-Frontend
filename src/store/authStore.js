import { create } from "zustand";
import axios from "axios";

const API_URL = 'http://localhost:3000';

const authStore = create((set) => ({
  user: null,
  token: null,
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
      set({ email: response.data.email, token: response.data.token });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Error en el login";
    }
  },
  register: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Error en el registro";
    }
  },
  logout: () => set({ user: null, token: null }),
}));

export default authStore;
