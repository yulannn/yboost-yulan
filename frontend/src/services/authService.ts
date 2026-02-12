import { useMutation } from '@tanstack/react-query';
import { LoginData } from '../types/LoginData';
import { RegisterData } from '../types/RegisterData';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const AuthService = {
  async login(formData: LoginData) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Une erreur est survenue');
    }

    const data = await response.json();
    return {
      employee: data.employee,
      access_token: data.access_token
    };
  },

  async register(formData: RegisterData) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Une erreur est survenue');
    }

    return await response.json();
  },

  async logout() {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Une erreur est survenue');
    }
    return await response.json();
  },

  async me() {
    const response = await fetch(`${BASE_URL}/auth/me`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Non authentifié');
    }
    return await response.json();
  },

  async updateAvatar(employeeId: string, formData: FormData) {
    const response = await fetch(`${BASE_URL}/employee/${employeeId}/profile-picture`, {
      method: 'PATCH',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Une erreur est survenue');
    }

    return await response.json();
  }
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginData) => AuthService.login(data),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterData) => AuthService.register(data),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => AuthService.logout(),
  });
};

export const useMe = () => {
  return useMutation({
    mutationFn: () => AuthService.me(),
  });
};

export const useUpdateAvatar = () => {
  return useMutation({
    mutationFn: ({ userId, formData }: { userId: string; formData: FormData }) =>
      AuthService.updateAvatar(userId, formData),
  });
};