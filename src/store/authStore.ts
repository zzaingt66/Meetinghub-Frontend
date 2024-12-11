import {create} from "zustand";

type AuthState = {
isAuthenticated: boolean;
user: { name: string } | null;
setAuthenticated: (auth: boolean) => void;
setUser: (user: { name: string } | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
isAuthenticated: false,
user: null,
setAuthenticated: (auth) => set({ isAuthenticated: auth }),
setUser: (user) => set({ user }),
}));