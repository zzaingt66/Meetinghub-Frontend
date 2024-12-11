import { useMutation } from "@tanstack/react-query";
import { login } from "../API/api";
import { useAuthStore } from "./authStore";

export const useLogin = () => {
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation(
    async (credentials: { email: string; password: string }) => {
      const data = await login(credentials);
      return data;
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        setAuthenticated(true);
        setUser({ name: data.user.name });
      },
      onError: () => {
        setAuthenticated(false);
        setUser(null);
      },
    }
  );
};
