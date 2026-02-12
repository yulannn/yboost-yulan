import { CocktailFetchData } from '../../types/CocktailFetchData';
import CocktailItem from '../cards/CocktailItemParams';

interface CocktailListProps {
  cocktails: CocktailFetchData[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const CocktailList = ({ cocktails, onDelete, onEdit }: CocktailListProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {cocktails.map((cocktail) => (
      <CocktailItem
        key={cocktail.cocktail_id}
        cocktail={cocktail}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    ))}
  </div>
);

export default CocktailList;