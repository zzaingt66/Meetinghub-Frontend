import { useMutation } from '@tanstack/react-query';
import { login, register, logout } from '../services/authService';
import useAuthStore from '../store/authStore';

export const useLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation(login, {
    onSuccess: (data) => {
      setUser(data.user);
    },
  });
};

export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setUser);
  return useMutation(register, {
    onSuccess: (data) => {
      setUser(data.user);
    },
  });
};

export const useLogout = () => {
  const logoutUser = useAuthStore((state) => state.logout);
  return useMutation(logout, {
    onSuccess: () => {
      logoutUser();
    },
  });
};