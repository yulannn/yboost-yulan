import { CocktailFetchData } from '../../types/CocktailFetchData';

interface CocktailItemProps {
  cocktail: CocktailFetchData;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const CocktailItemParams = ({ cocktail, onDelete, onEdit }: CocktailItemProps) => {

  return (
    <div className="relative py-4 px-6 bg-custom shadow-lg rounded-lg backdrop-blur-sm border border-gray-700/30">
      <div className="flex items-center gap-4">
        <img
          src={cocktail.image}
          alt={cocktail.name}
          className="w-16 h-16 rounded-lg object-cover shadow-xl ring-2 ring-white/10"
        />
        <div className="flex-1">
          <h3 className="text-lg integral-font text-white mb-2">
            {cocktail.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm integral-font text-white/80">
              💰 {cocktail.price}€
            </span>
          </div>
          <div className="mt-1 flex justify-between items-center">
            <span className="text-sm integral-font text-white/80">
              {cocktail.alcohol ? "🍸" : ""}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(cocktail.cocktail_id)}
                className="text-white/80 hover:text-white transition-colors text-white rounded transition-colors px-2 py-1 text-xs"
              >
                Modifier
              </button>
              <button
                onClick={() => onDelete(cocktail.cocktail_id)}
                className="text-white/80 hover:text-white transition-colors bg-red-500/20 hover:bg-red-500/40 text-white rounded transition-colors px-2 py-1 text-xs"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CocktailItemParams;