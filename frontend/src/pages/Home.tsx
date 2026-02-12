import CocktailListe from '../components/common/CocktailListe';
import Navbar from '../components/navigation/Navbar';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-light">
      <Navbar />

      {/* Hero Section - Minimaliste et élégant */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-dark text-light"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 lg:py-40">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            <div className="inline-block px-4 py-2 border border-light/20 mb-8">
              <span className="space-font text-xs tracking-widest text-light/80">YBOOST BARR</span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl integral-font mb-8 tracking-tighter leading-none">
              L'Art du<br />Cocktail
            </h1>

            <p className="text-lg md:text-xl space-font text-light/70 max-w-2xl leading-relaxed mb-12">
              Découvrez une expérience unique où chaque cocktail raconte une histoire.
              Mixologie moderne ingrédients premium, service irréprochable.
            </p>

            <motion.button
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              onClick={() => document.getElementById('cocktails')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-3 border border-light px-8 py-4 hover:bg-light hover:text-dark transition-all duration-300"
            >
              <span className="space-font text-sm tracking-wider">VOIR LA CARTE</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.button>
          </motion.div>
        </div>

        {/* Accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />
      </motion.section>

      {/* Main Content */}
      <section id="cocktails" className="relative bg-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 lg:py-36">
          <CocktailListe />
        </div>
      </section>

      {/* Footer - Minimaliste */}
      <footer className="bg-dark text-light/60 border-t border-light/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="integral-font text-light text-xl mb-2 tracking-tight">Yboost</p>
              <p className="space-font text-xs tracking-wide">L'excellence au service du goût</p>
            </div>

            <div className="flex gap-8 text-xs space-font tracking-wider">
              <a href="#" className="hover:text-light transition-colors">À PROPOS</a>
              <a href="#" className="hover:text-light transition-colors">CONTACT</a>
              <a href="#" className="hover:text-light transition-colors">RÉSERVATION</a>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-light/10 text-center">
            <p className="space-font text-xs">
              © 2024 Yboost. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
