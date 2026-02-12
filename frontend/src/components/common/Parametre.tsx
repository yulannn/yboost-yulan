import { useState } from 'react';
import { fetchAllCocktails, useDeleteCocktail } from '../../services/cocktailService';
import CocktailList from '../common/CocktailListeParams';
import AddCocktailForm from '../forms/AddCocktailForm';
import EditCocktailForm from '../forms/EditCocktailForm';
import { CocktailFetchData } from '../../types/CocktailFetchData';
import { Plus } from 'lucide-react';

const Parametre = () => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedCocktail, setSelectedCocktail] = useState<CocktailFetchData | null>(null);
  const { data: cocktails, isLoading, error } = fetchAllCocktails();
  const deleteMutation = useDeleteCocktail();

  const handleDelete = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce cocktail ?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (id: number) => {
    const cocktailToEdit = cocktails?.find(c => c.cocktail_id === id);
    if (cocktailToEdit) {
      setSelectedCocktail(cocktailToEdit);
      setIsEditFormOpen(true);
    }
  };

  if (isLoading) return (
    <div className="text-center space-font text-gray py-12">
      Chargement...
    </div>
  );

  if (error) return (
    <div className="text-center space-font text-red-600 py-12">
      Une erreur est survenue
    </div>
  );

  return (
    <div className="flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl integral-font text-dark mb-6 tracking-tight">
          Gestion des cocktails
        </h2>
      </div>

      <div>
        <div className="overflow-x-auto mb-8">
          <CocktailList
            cocktails={cocktails || []}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setIsAddFormOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-dark text-light space-font text-sm tracking-wider hover:bg-gray-800 transition-colors"
          >
            <Plus size={20} />
            AJOUTER UN COCKTAIL
          </button>
        </div>
      </div>

      <AddCocktailForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
      />

      {selectedCocktail && (
        <EditCocktailForm
          isOpen={isEditFormOpen}
          onClose={() => {
            setIsEditFormOpen(false);
            setSelectedCocktail(null);
          }}
          cocktail={selectedCocktail}
        />
      )}
    </div>
  );
};

export default Parametre;