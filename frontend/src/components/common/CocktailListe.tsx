import { fetchAllCocktails } from '../../services/cocktailService';
import CocktailCard from '../cards/CocktailCard';
import { motion } from 'framer-motion';

interface CocktailListeProps {
  excludeCocktailId?: number;
}

const CocktailListe: React.FC<CocktailListeProps> = ({ excludeCocktailId }) => {
  const { data: cocktails, isLoading, error } = fetchAllCocktails();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <div className="w-12 h-12 border-2 border-dark border-t-transparent rounded-full animate-spin" />
        <p className="text-dark space-font mt-6 text-sm tracking-wide">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <div className="max-w-md text-center">
          <p className="text-dark integral-font text-xl mb-3">Une erreur est survenue</p>
          <p className="text-gray space-font text-sm">Impossible de charger les cocktails</p>
        </div>
      </div>
    );
  }

  const filteredCocktails = cocktails?.filter(
    cocktail => cocktail.cocktail_id !== excludeCocktailId
  );

  if (!filteredCocktails || filteredCocktails.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <p className="text-dark integral-font text-xl">Aucun cocktail disponible</p>
      </div>
    );
  }

  const alcoholicCount = filteredCocktails.filter(c => c.alcohol).length;
  const nonAlcoholicCount = filteredCocktails.filter(c => !c.alcohol).length;

  return (
    <div className="w-full">
      {/* Header Section - Épuré et professionnel */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl integral-font text-dark mb-4 tracking-tight">
              Notre Carte
            </h1>
            <p className="text-gray space-font text-base md:text-lg max-w-2xl leading-relaxed">
              Une sélection raffinée de cocktails classiques et créations originales,
              préparés avec soin par nos bartenders.
            </p>
          </div>
        </div>

        {/* Stats minimales */}
        <div className="flex gap-8 text-sm space-font">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl integral-font text-dark">{filteredCocktails.length}</span>
            <span className="text-gray">Cocktails</span>
          </div>
          <div className="h-8 w-px bg-light" />
          <div className="flex items-baseline gap-2">
            <span className="text-3xl integral-font text-dark">{alcoholicCount}</span>
            <span className="text-gray">Avec Alcool</span>
          </div>
          <div className="h-8 w-px bg-light" />
          <div className="flex items-baseline gap-2">
            <span className="text-3xl integral-font text-dark">{nonAlcoholicCount}</span>
            <span className="text-gray">Sans Alcool</span>
          </div>
        </div>
      </motion.div>

      {/* Grid de cocktails - 3 colonnes max pour plus d'espace */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
        {filteredCocktails.map((cocktail, index) => (
          <motion.div
            key={cocktail.cocktail_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
          >
            <CocktailCard {...cocktail} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CocktailListe;
