import PanierListe from '../components/common/PanierListe';
import Navbar from '../components/navigation/Navbar';
import { motion } from 'framer-motion';

const Panier = () => {
  return (
    <div className="flex flex-col min-h-screen bg-light">
      <Navbar />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl integral-font text-dark mb-4 tracking-tight">
            Panier
          </h1>
          <p className="text-gray space-font text-lg">
            Finalisez votre commande
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <PanierListe />
        </motion.div>
      </div>
    </div>
  );
};

export default Panier;
