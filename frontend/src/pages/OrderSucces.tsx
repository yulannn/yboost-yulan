import { useState, useEffect } from 'react';
import Navbar from '../components/navigation/Navbar';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Home } from 'lucide-react';

const OrderSucces = () => {
  const navigate = useNavigate();
  const [tableNumber, setTableNumber] = useState<number | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const table = params.get('table');

    if (table) {
      setTableNumber(parseInt(table, 10));
    }
  }, []);

  return (
    <div className="min-h-screen bg-light">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-strong p-12 text-center"
        >
          {/* Icône de succès */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <div className="w-24 h-24 bg-green-50 border-4 border-green-500 rounded-full flex items-center justify-center">
              <CheckCircle size={48} className="text-green-500" />
            </div>
          </motion.div>

          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl integral-font text-dark mb-4 tracking-tight"
          >
            Commande validée !
          </motion.h1>

          {/* Numéro de table */}
          {tableNumber && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <p className="text-lg space-font text-gray mb-2">Table</p>
              <p className="text-6xl integral-font text-dark">{tableNumber}</p>
            </motion.div>
          )}

          {/* Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg space-font text-gray mb-12 max-w-md mx-auto"
          >
            Merci pour votre commande ! Vos cocktails seront bientôt prêts.
          </motion.p>

          {/* Séparateur */}
          <div className="border-t border-light my-8"></div>

          {/* Boutons d'action */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-dark text-light space-font text-sm tracking-wider hover:bg-gray-800 transition-colors"
            >
              <Home size={20} />
              RETOUR À L'ACCUEIL
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-dark text-dark space-font text-sm tracking-wider hover:bg-dark hover:text-light transition-colors"
            >
              VOIR MES COMMANDES
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSucces;
