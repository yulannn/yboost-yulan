import { useState } from 'react';
import { useAuth } from '../../features/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      console.error('Erreur de connexion:', err);
      setError('Email ou mot de passe incorrect');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm space-font text-dark mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-light text-dark space-font focus:outline-none focus:border-dark transition-colors"
          required
          autoComplete="email"
          placeholder="votre@email.com"
        />
      </div>

      {/* Mot de passe */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm space-font text-dark mb-2"
        >
          Mot de passe
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-light text-dark space-font focus:outline-none focus:border-dark transition-colors"
          required
          autoComplete="current-password"
          placeholder="••••••••"
        />
      </div>

      {/* Erreur */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200">
          <p className="text-red-600 text-sm space-font">{error}</p>
        </div>
      )}

      {/* Bouton */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 bg-dark text-light space-font text-sm tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'CONNEXION...' : 'SE CONNECTER'}
      </button>

      {/* Lien inscription */}
      <p className="text-center text-gray space-font text-sm">
        Pas encore de compte ?{' '}
        <a href="/register" className="text-dark hover:underline">
          S'inscrire
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
