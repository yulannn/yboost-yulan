import '../../App.css';
import { CocktailFetchData } from '../../types/CocktailFetchData';
import CocktailListe from '../common/CocktailListe';
import AddButton from '../button/AddButton';
import { motion } from 'framer-motion';

interface CocktailDetailCardProps {
  cocktail: CocktailFetchData;
}

const CocktailDetailCard: React.FC<CocktailDetailCardProps> = ({
  cocktail,
}) => {
  const { name, description, price, image, cocktail_id, alcohol } = cocktail;

  // Utiliser la même fonction que CocktailCard pour les images
  const getCocktailImage = (cocktailName: string) => {
    const images: { [key: string]: string } = {
      'Mojito': 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&h=800&fit=crop',
      'Cosmopolitan': 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=800&fit=crop',
      'Margarita': 'https://images.unsplash.com/photo-1438557068880-c5f474830377?w=600&h=800&fit=crop',
      'Gin Tonic': 'https://images.unsplash.com/photo-1530991808291-2d2203d14463?w=600&h=800&fit=crop',
      'Rhum Coca': 'https://images.unsplash.com/photo-1481671703460-040cb8a2d909?w=600&h=800&fit=crop',
      'Screwdriver': 'https://images.unsplash.com/photo-1544145945-35c4e1a5f1ae?w=600&h=800&fit=crop',
      'Virgin Mojito': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=800&fit=crop'
    };
    return images[cocktailName] || image || 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=800&fit=crop';
  };

  return (
    <div className="w-full">
      {/* Section détails */}
      <div className="bg-dark text-light py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <div className="aspect-[3/4] w-full bg-gray-900 overflow-hidden">
                <img
                  src={getCocktailImage(name)}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <AddButton
                cocktail_id={cocktail_id}
                name={name}
                price={price}
                image={getCocktailImage(name)}
              />
            </motion.div>

            {/* Informations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              {alcohol !== undefined && (
                <div className="mb-6">
                  {alcohol ? (
                    <span className="inline-block px-4 py-2 bg-light/10 border border-light/20 text-xs space-font tracking-widest">
                      AVEC ALCOOL
                    </span>
                  ) : (
                    <span className="inline-block px-4 py-2 bg-light/10 border border-light/20 text-xs space-font tracking-widest">
                      SANS ALCOOL
                    </span>
                  )}
                </div>
              )}

              <h1 className="text-5xl md:text-6xl lg:text-7xl integral-font mb-8 tracking-tight">
                {name}
              </h1>

              {description && (
                <p className="text-lg md:text-xl space-font text-light/80 mb-12 leading-relaxed max-w-2xl">
                  {description}
                </p>
              )}

              <div className="flex items-baseline gap-2 mb-12">
                <span className="text-5xl integral-font">{price.toFixed(2)}€</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Section autres cocktails */}
      <div className="bg-light py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <CocktailListe excludeCocktailId={cocktail_id} />
        </div>
      </div>
    </div>
  );
};

export default CocktailDetailCard;
