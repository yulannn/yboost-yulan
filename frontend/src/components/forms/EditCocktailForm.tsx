import { useState } from 'react';
import { useUpdateCocktail } from '../../services/cocktailService';
import { CocktailFetchData } from '../../types/CocktailFetchData';

interface EditCocktailFormProps {
  isOpen: boolean;
  onClose: () => void;
  cocktail: CocktailFetchData;
}

const EditCocktailForm = ({ isOpen, onClose, cocktail }: EditCocktailFormProps) => {
  const [formData, setFormData] = useState(cocktail);
  const updateMutation = useUpdateCocktail();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { cocktail_id, ...cocktailData } = formData;
    updateMutation.mutate(
      { id: cocktail_id, cocktail: cocktailData },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-custom rounded-lg p-8 max-w-md w-full border border-gray-700/30 shadow-lg">
        <h2 className="text-3xl integral-font text-white mb-6 text-center">
          Modifier le cocktail
        </h2>
        <div className="border-b-2 border-white/30 mb-8"></div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg integral-font text-white/80 mb-2">Nom</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 rounded bg-custom text-white backdrop-blur-sm border border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-custom-violet hover:cursor-text"
              required
            />
          </div>

          <div>
            <label className="block text-lg integral-font text-white/80 mb-2">Prix</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
              className="w-full p-3 rounded bg-custom text-white backdrop-blur-sm border border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-custom-violet hover:cursor-text"
              required
            />
          </div>

          <div>
            <label className="block text-lg integral-font text-white/80 mb-2">Image URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="w-full p-3 rounded bg-custom text-white backdrop-blur-sm border border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-custom-violet hover:cursor-text"
              required
            />
          </div>

          <div>
            <label className="block text-lg integral-font text-white/80 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-3 rounded bg-custom text-white backdrop-blur-sm border border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-custom-violet hover:cursor-text"
              rows={4}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.alcohol}
              onChange={(e) => setFormData({...formData, alcohol: e.target.checked})}
              className="w-5 h-5 rounded border-gray-700/30 text-custom-violet focus:ring-custom-violet hover:cursor-pointer"
            />
            <label className="ml-3 text-lg integral-font text-white/80">
              Contient de l'alcool
            </label>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="relative px-6 h-12 bg-custom hover:cursor-pointer text-white integral-font rounded backdrop-blur-sm border border-gray-700/30 opacity-90 hover:opacity-100 overflow-hidden group"
            >
              <span className="relative z-10">Annuler</span>
              <div className="absolute inset-0 bg-custom-violet transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            <button
              type="submit"
              className="relative px-6 h-12 bg-custom hover:cursor-pointer text-white integral-font rounded backdrop-blur-sm border border-gray-700/30 opacity-90 hover:opacity-100 overflow-hidden group"
            >
              <span className="relative z-10">Modifier</span>
              <div className="absolute inset-0 bg-custom-violet transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCocktailForm;
