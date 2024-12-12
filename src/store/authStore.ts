import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (userData: { user: User; token: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: ({ user, token }) => 
        set({ user, token, isAuthenticated: true }),
      logout: () => 
        set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage', // Nombre de la clave en localStorage
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);