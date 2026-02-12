import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthService } from '../../services/authService';
import { Employee } from '../../types/EmployeeData';

interface AuthState {
  user: Employee | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
}

interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateAvatar: (formData: FormData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    status: 'loading',
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await AuthService.me();
        setAuthState({
          user: userData,
          status: 'authenticated',
        });
      } catch (error) {
        console.error("❌ Erreur de récupération de l'utilisateur:", error);
        setAuthState({
          user: null,
          status: 'unauthenticated',
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await AuthService.login({ email, password });
      if (response.employee) {
        setAuthState({
          user: response.employee,
          status: 'authenticated',
        });
      } else {
        throw new Error('Données utilisateur manquantes');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setAuthState({
        user: null,
        status: 'unauthenticated',
      });
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      throw error;
    }
  };

  const updateAvatar = async (formData: FormData) => {
    if (!authState.user) return;

    try {
      await AuthService.updateAvatar(authState.user.employee_id.toString(), formData);
      const updatedUser = await AuthService.me();
      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
      }));
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'avatar:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, updateAvatar }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };