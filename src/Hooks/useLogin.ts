import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  token: string;
}

const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const { data } = await axios.post('/api/auth/login', credentials);
  return data;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  return useMutation(loginUser, {
    onSuccess: (data) => {
      login({
        user: data.user,
        token: data.token
      });

      axios.defaults.headers.common['Authorization'] = `Token ${data.token}`;

      navigate('/dashboard');
    },
    onError: (error: any) => {
      console.error('Error de login:', error);
    }
  });
};