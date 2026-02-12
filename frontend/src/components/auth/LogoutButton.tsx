import { useState } from 'react';
import { useAuth } from '../../features/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleClick() {
    try {
      setLoading(true);
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="w-full px-4 py-3 text-left text-sm space-font text-dark hover:bg-gray-100 transition-colors disabled:opacity-50 flex items-center gap-2"
    >
      <LogOut size={16} />
      {loading ? 'Déconnexion...' : 'Se déconnecter'}
    </button>
  );
};

export default LogoutButton;
