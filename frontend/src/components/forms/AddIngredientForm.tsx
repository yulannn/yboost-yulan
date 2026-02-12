import { useState } from 'react';
import { useCreateIngredient } from '../../services/ingredientService';

interface AddIngredientFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddIngredientForm = ({ isOpen, onClose }: AddIngredientFormProps) => {
  const initialState = {
    name: '',
    image: '',
    alcohol: false,
    stock: 0,
  };

  const [ingredient, setIngredient] = useState(initialState);
  const createMutation = useCreateIngredient();

  const handleCancel = () => {
    setIngredient(initialState);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({
      ...ingredient,
    }, {
      onSuccess: () => {
        setIngredient(initialState);
        onClose();
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-custom rounded-lg p-8 max-w-md w-full border border-gray-700/30 shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl integral-font text-white mb-6 text-center">
          Ajouter un ingrédient
        </h2>
        <div className="border-b-2 border-white/30 mb-8"></div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg integral-font text-white/80 mb-2">Nom</label>
            <input
              type="text"
              value={ingredient.name}
              onChange={(e) => setIngredient({...ingredient, name: e.target.value})}
              className="w-full p-3 rounded bg-custom text-white backdrop-blur-sm border border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-custom-violet"
              required
            />
          </div>

          <div>
            <label className="block text-lg integral-font text-white/80 mb-2">Image URL</label>
            <input
              type="text"
              value={ingredient.image}
              onChange={(e) => setIngredient({...ingredient, image: e.target.value})}
              className="w-full p-3 rounded bg-custom text-white backdrop-blur-sm border border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-custom-violet"
              required
            />
          </div>

          <div>
            <label className="block text-lg integral-font text-white/80 mb-2">Stock initial</label>
            <input
              type="number"
              value={ingredient.stock}
              onChange={(e) => setIngredient({...ingredient, stock: parseInt(e.target.value)})}
              className="w-full p-3 rounded bg-custom text-white backdrop-blur-sm border border-gray-700/30 focus:outline-none focus:ring-2 focus:ring-custom-violet"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={ingredient.alcohol}
              onChange={(e) => setIngredient({...ingredient, alcohol: e.target.checked})}
              className="w-5 h-5 rounded border-gray-700/30 text-custom-violet focus:ring-custom-violet"
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

export default AddIngredientForm;