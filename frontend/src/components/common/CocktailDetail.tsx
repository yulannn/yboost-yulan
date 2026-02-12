import { useParams } from 'react-router-dom';
import { fetchCocktailById } from '../../services/cocktailService';
import CocktailDetailCard from '../cards/CocktailDetailCard';

const CocktailDetails: React.FC = ()  => {

    const { cocktail_id } = useParams<{ cocktail_id: string }>();

    if (!cocktail_id) {
        return <div>Invalid Cocktail ID</div>;
    }

    const id_cocktail = parseInt(cocktail_id)

    const { data: cocktail, isLoading, error } = fetchCocktailById(id_cocktail);

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;


    if (!cocktail) {
        return <div>Cocktail not found</div>;
    }

  return (
    <div className='flex justify-center items-center'>
       <CocktailDetailCard cocktail={cocktail} />
    </div>
  );
}

export default CocktailDetails;
