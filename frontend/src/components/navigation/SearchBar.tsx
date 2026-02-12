import { useNavigate } from 'react-router-dom';
import { fetchAllCocktails } from '../../services/cocktailService';
import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

const InputSearch: React.FC = () => {
  const navigate = useNavigate();
  const { data: cocktails, isLoading, error } = fetchAllCocktails();
  const [search, setSearch] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isLoading) return null;
  if (error) return null;

  const filtered = cocktails?.filter(cocktail =>
    cocktail.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!filtered) return null;

  const handleClickCocktail = (cocktailId: string) => {
    setSearch('');
    setIsOpen(false);
    navigate(`/cocktail/${cocktailId}`);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray" size={18} />
        <input
          type="text"
          placeholder="Rechercher un cocktail..."
          className="w-full pl-10 pr-4 py-2 border border-light text-dark space-font text-sm focus:outline-none focus:border-dark transition-colors bg-white"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
          }}
        />
      </div>

      {/* Dropdown de résultats */}
      {search && filtered?.length > 0 && isOpen && (
        <div className="absolute z-50 bg-white border border-light shadow-strong w-full mt-1 max-h-80 overflow-y-auto">
          {filtered.map((cocktail, index) => (
            <div
              key={index}
              className="p-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center border-b border-light last:border-b-0 transition-colors"
              onClick={() => handleClickCocktail(cocktail.cocktail_id.toString())}
            >
              <div className="flex-1">
                <h3 className="text-sm integral-font text-dark">{cocktail.name}</h3>
                <p className="text-xs space-font text-gray mt-1">{cocktail.price.toFixed(2)}€</p>
              </div>
              {cocktail.image && (
                <img
                  src={cocktail.image}
                  alt={cocktail.name}
                  className="w-12 h-12 object-cover bg-gray-100"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Message si aucun résultat */}
      {search && filtered?.length === 0 && isOpen && (
        <div className="absolute z-50 bg-white border border-light shadow-strong w-full mt-1 p-4">
          <p className="text-sm space-font text-gray text-center">
            Aucun cocktail trouvé
          </p>
        </div>
      )}
    </div>
  );
};

export default InputSearch;
