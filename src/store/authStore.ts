import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
}

// Interface for auth state
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (userData: User, token: string) => void;
  register: (userData: User, token: string) => void;
  logout: () => void;
  getToken: () => string | null; // Add this method to the interface
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (userData, token) => {
        console.log("Logging in with:", { userData, token });
        set({
          user: userData,
          token: token,
          isAuthenticated: true,
        });
        console.log("After login, store state:", get());
      },

      register: (userData, token) => {
        console.log("Registering with:", { userData, token });
        set({
          user: userData,
          token: token,
          isAuthenticated: true,
        });
        console.log("After register, store state:", get());
      },

      logout: () => {
        console.log("Logging out");
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      // Add getToken method inside the store configuration
      getToken: () => get().token,
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

console.log("Token al inicializar:", useAuthStore.getState().token);
