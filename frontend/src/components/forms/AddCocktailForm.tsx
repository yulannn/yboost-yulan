import { useState } from 'react';
import { useCreateCocktail } from '../../services/cocktailService';

interface AddCocktailFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCocktailForm = ({ isOpen, onClose }: AddCocktailFormProps) => {
  const initialState = {
    name: '',
    price: 0,
    image: '',
    description: '',
    alcohol: false,
  };

  const [cocktail, setCocktail] = useState(initialState);
  const createMutation = useCreateCocktail();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(cocktail, {
      onSuccess: () => {
        setCocktail(initialState);
        onClose();
      },
    });
  };

  const handleCancel = () => {
    setCocktail(initialState);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-custom rounded-lg p-8 max-w-md w-full border border-gray-700/30 shadow-lg">
        <h2 className="text-3xl integral-font text-white mb-6 text-center">
          Ajouter un nouveau cocktail
        </h2>
        <div className="border-b-2 border-white/30 mb-8"></div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg integral-font text-white/80 mb-2">Nom</label>
            <input
              type="text"
              value={cocktail.name}
              onChange={(e) => setCocktail({...cocktail, name: e.target.value})}
              className="w-full p-3 rounded bg-custom text-white backdrop-blur-sm border border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-custom-violet hover:cursor-text"
              required
            />
          </div>

          <div>
            <label className="block text-lg integral-font text-white/80 mb-2">Prix</label>
            <input
              type="number"
              value={cocktail.price}
              onChange={(e) => setCocktail({...cocktail, price: parseFloat(e.target.value)})}
              className="w-full p-3 rounded bg-custom text-white backdrop-blur-sm border border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-custom-violet hover:cursor-text"
              required
            />
          </div>

          <div>
            <label className="block text-lg integral-font text-white/80 mb-2">Image URL</label>
            <input
              type="text"
              value={cocktail.image}
              onChange={(e) => setCocktail({...cocktail, image: e.target.value})}
              className="w-full p-3 rounded bg-custom text-white backdrop-blur-sm border border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-custom-violet hover:cursor-text"
              required
            />
          </div>

          <div>
            <label className="block text-lg integral-font text-white/80 mb-2">Description</label>
            <textarea
              value={cocktail.description}
              onChange={(e) => setCocktail({...cocktail, description: e.target.value})}
              className="w-full p-3 rounded bg-custom text-white backdrop-blur-sm border border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-custom-violet hover:cursor-text"
              rows={4}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={cocktail.alcohol}
              onChange={(e) => setCocktail({...cocktail, alcohol: e.target.checked})}
              className="w-5 h-5 rounded border-gray-700/30 text-custom-violet focus:ring-custom-violet hover:cursor-pointer"
            />
            <label className="ml-3 text-lg integral-font text-white/80">
              Contient de l'alcool
            </label>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={handleCancel}
              className="relative px-6 h-12 bg-custom hover:cursor-pointer text-white integral-font rounded backdrop-blur-sm border border-gray-700/30 opacity-90 hover:opacity-100 overflow-hidden group"
            >
              <span className="relative z-10">Annuler</span>
              <div className="absolute inset-0 bg-custom-violet transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            <button
              type="submit"
              className="relative px-6 h-12 bg-custom hover:cursor-pointer text-white integral-font rounded backdrop-blur-sm border border-gray-700/30 opacity-90 hover:opacity-100 overflow-hidden group"
            >
              <span className="relative z-10">Ajouter</span>
              <div className="absolute inset-0 bg-custom-violet transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCocktailForm;