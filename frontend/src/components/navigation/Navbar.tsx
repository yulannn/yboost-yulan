import { Link, useNavigate } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useAuth } from '../../features/auth/AuthContext';
import Logo from '../../assets/img/logo.png';
import InputSearch from './SearchBar';
import { ShoppingBasket, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import '../../App.css';

const Navbar: React.FC = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const { panierCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-light shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate('/')}
          >
            <img
              className="h-12 w-12 rounded-full object-cover"
              src={Logo}
              alt="Yboost"
            />
            <span className="ml-3 text-xl integral-font text-dark tracking-tight hidden sm:block">
              Yboost
            </span>
          </div>

          {/* Center - Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <InputSearch />
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-4">
            {/* Panier */}
            <button
              onClick={() => navigate('/panier')}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Panier"
            >
              <ShoppingBasket className="text-dark" size={24} />
              {panierCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-dark text-light text-xs integral-font rounded-full w-5 h-5 flex items-center justify-center">
                  {panierCount}
                </span>
              )}
            </button>

            {/* User Menu - Desktop */}
            <div className="hidden md:block relative group">
              <button
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Menu utilisateur"
              >
                {authState.user?.profile_pic ? (
                  <img
                    src={authState.user.profile_pic}
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="text-gray-600" size={20} />
                  </div>
                )}
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-light shadow-strong opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {authState.status === 'authenticated' && authState.user ? (
                  <div className="py-2">
                    <div className="px-4 py-3 border-b border-light">
                      <p className="text-sm integral-font text-dark">
                        {authState.user.name} {authState.user.lastname}
                      </p>
                      <p className="text-xs space-font text-gray mt-1">
                        {authState.user.email}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-3 text-sm space-font text-dark hover:bg-gray-100 transition-colors"
                    >
                      Profil
                    </Link>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-3 text-sm space-font text-dark hover:bg-gray-100 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <div className="border-t border-light mt-2 pt-2">
                      <LogoutButton />
                    </div>
                  </div>
                ) : (
                  <div className="py-2">
                    <Link
                      to="/login"
                      className="block px-4 py-3 text-sm space-font text-dark hover:bg-gray-100 transition-colors"
                    >
                      Se connecter
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-3 text-sm space-font text-dark hover:bg-gray-100 transition-colors"
                    >
                      S'inscrire
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="text-dark" size={24} />
              ) : (
                <Menu className="text-dark" size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <InputSearch />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-light bg-white">
          <div className="px-6 py-4 space-y-2">
            {authState.status === 'authenticated' && authState.user ? (
              <>
                <div className="pb-4 border-b border-light">
                  <p className="text-sm integral-font text-dark">
                    {authState.user.name} {authState.user.lastname}
                  </p>
                  <p className="text-xs space-font text-gray mt-1">
                    {authState.user.email}
                  </p>
                </div>
                <Link
                  to="/profile"
                  className="block py-3 text-sm space-font text-dark hover:bg-gray-100 px-4 -mx-4 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profil
                </Link>
                <Link
                  to="/dashboard"
                  className="block py-3 text-sm space-font text-dark hover:bg-gray-100 px-4 -mx-4 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="pt-2 border-t border-light">
                  <LogoutButton />
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-3 text-sm space-font text-dark hover:bg-gray-100 px-4 -mx-4 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Se connecter
                </Link>
                <Link
                  to="/register"
                  className="block py-3 text-sm space-font text-dark hover:bg-gray-100 px-4 -mx-4 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
