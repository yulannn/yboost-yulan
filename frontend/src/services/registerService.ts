import { apiClient } from "../services/api/apiClient";
import { RegisterData } from "../types/RegisterData";

export const registerService = {
  register: async (registerData: RegisterData): Promise<{ employee: any }> => {
    console.log('Attempting to register with data:', registerData);

    try {
      const response = await apiClient<{ employee: any }>('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: registerData,
        credentials: 'include',
      });

      return response;

    } catch (error) {
      console.error('Register failed:', error);
      throw new Error('Register failed');
    }
  },
};