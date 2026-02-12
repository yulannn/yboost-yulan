import { CocktailFetchData } from "../../types/CocktailFetchData";
import '../../App.css';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CocktailCard = (cocktail: CocktailFetchData) => {
  const { cocktail_id, name, price, alcohol, description } = cocktail;
  const navigate = useNavigate();

  // Images réalistes et de haute qualité - URLs corrigées
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
    return images[cocktailName] || 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=800&fit=crop';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group"
    >
      <div
        onClick={() => navigate(`/cocktail/${cocktail_id}`)}
        className="bg-white rounded-none overflow-hidden cursor-pointer hover-lift shadow-card hover:shadow-card-hover transition-all duration-300"
      >
        {/* Image */}
        <div className="relative h-80 overflow-hidden bg-gray-100">
          <img
            src={getCocktailImage(name)}
            alt={name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />

          {/* Badge discret */}
          {!alcohol && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-white/95 backdrop-blur-sm">
              <span className="text-xs font-medium text-dark tracking-wide">SANS ALCOOL</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Nom */}
          <h3 className="text-2xl integral-font text-dark mb-2 tracking-tight">
            {name}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-sm text-gray space-font line-clamp-2 mb-4 leading-relaxed">
              {description}
            </p>
          )}

          {/* Prix */}
          <div className="flex items-center justify-between pt-4 border-t border-light">
            <span className="text-2xl integral-font text-dark">
              {price.toFixed(2)}€
            </span>
            <div className="flex items-center gap-2 text-dark group-hover:text-accent transition-colors duration-300">
              <span className="text-sm space-font font-medium tracking-wide">DÉCOUVRIR</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CocktailCard;
