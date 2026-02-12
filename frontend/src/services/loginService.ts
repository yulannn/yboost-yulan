import { apiClient } from "../services/api/apiClient";
import { LoginData } from "../types/LoginData";

export const loginService = {
  login: async (loginData: LoginData): Promise<{ access_token: string; employee: any }> => {
    try {
      const response = await apiClient<{ access_token: string; employee: any }>('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: loginData,
        credentials: 'include',
      });

      return response;

    } catch (error) {
      throw new Error('Login failed');
    }
  },
};
