import { useState } from 'react';
import { fetchAllIngredients } from '../../services/ingredientService';
import AddIngredientForm from '../forms/AddIngredientForm';
import EditIngredientForm from '../forms/EditIngredientForm';
import { Ingredient } from '../../types/Ingredient';
import { Plus, Edit2, Package } from 'lucide-react';

const IngredientList = () => {
  const [isAddIngredientFormOpen, setIsAddIngredientFormOpen] = useState(false);
  const { data: ingredients, isLoading, error } = fetchAllIngredients();
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  if (isLoading) return <div className="text-center space-font text-gray py-12">Chargement...</div>;
  if (error) return <div className="text-center space-font text-red-600 py-12">Une erreur est survenue</div>;

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl integral-font text-dark mb-6 tracking-tight">
          Gestion du stock
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {ingredients?.map((ingredient) => (
          <div
            key={ingredient.ingredient_id}
            className="bg-white shadow-card p-6 hover:shadow-card-hover transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              {ingredient.image && (
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className="w-16 h-16 object-cover bg-gray-100"
                />
              )}
              <div className="flex-1">
                <h3 className="text-lg integral-font text-dark mb-2 tracking-tight">
                  {ingredient.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <Package size={16} className="text-gray" />
                  <span className="text-sm space-font text-gray">
                    Stock: <span className="text-dark font-medium">{ingredient.stock}</span>
                  </span>
                </div>
                {ingredient.alcohol && (
                  <span className="inline-block px-2 py-1 bg-gray-100 text-xs space-font text-gray">
                    Alcool
                  </span>
                )}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-light">
              <button
                onClick={() => {
                  setSelectedIngredient(ingredient);
                  setIsEditFormOpen(true);
                }}
                className="inline-flex items-center gap-2 text-sm space-font text-dark hover:text-gray-700 transition-colors"
              >
                <Edit2 size={14} />
                Modifier
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setIsAddIngredientFormOpen(true)}
          className="inline-flex items-center gap-2 px-8 py-4 bg-dark text-light space-font text-sm tracking-wider hover:bg-gray-800 transition-colors"
        >
          <Plus size={20} />
          AJOUTER UN INGRÉDIENT
        </button>
      </div>

      <AddIngredientForm
        isOpen={isAddIngredientFormOpen}
        onClose={() => setIsAddIngredientFormOpen(false)}
      />

      {selectedIngredient && (
        <EditIngredientForm
          isOpen={isEditFormOpen}
          onClose={() => {
            setIsEditFormOpen(false);
            setSelectedIngredient(null);
          }}
          ingredient={selectedIngredient}
        />
      )}
    </>
  );
};

export default IngredientList;