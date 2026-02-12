// On utilise la variable d'environnement si elle existe, sinon localhost par défaut
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  credentials?: RequestCredentials;
};

export const apiClient = async<T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
  const { method = 'GET', headers, body, credentials } = options;

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
      credentials: credentials || 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    }

    return await response.json() as T;
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
};
