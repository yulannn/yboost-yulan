import { useEffect, useState } from 'react';
import '../../App.css';
import { useCart } from '../context/CartContext';
import ValideOrder from '../button/ValideOrder';
import { motion } from 'framer-motion';

const PanierListe = () => {
  const [panier, setPanier] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [table, setTable] = useState<number>();
  const { setPanierCount } = useCart();

  useEffect(() => {
    const storedPanier = window.localStorage.getItem('shoppingCart');
    if (storedPanier) {
      const parsedPanier = JSON.parse(storedPanier);
      setPanier(parsedPanier);
      updateTotal(parsedPanier);
    }
  }, []);

  const updateTotal = (updatedPanier: any[]) => {
    const newTotal = updatedPanier.reduce(
      (acc: number, item: any) => acc + item.price * item.quantity,
      0,
    );
    setTotal(newTotal);
  };

  const handleAdd = (index: number) => {
    const updatedPanier = [...panier];
    updatedPanier[index].quantity += 1;
    setPanier(updatedPanier);
    setPanierCount((curr) => curr + 1);
    updateTotal(updatedPanier);
    window.localStorage.setItem('shoppingCart', JSON.stringify(updatedPanier));
  };

  const handleRemove = (index: number) => {
    const updatedPanier = [...panier];
    if (updatedPanier[index].quantity > 1) {
      updatedPanier[index].quantity -= 1;
    } else {
      updatedPanier.splice(index, 1);
    }
    setPanier(updatedPanier);
    updateTotal(updatedPanier);
    setPanierCount((curr) => curr - 1);
    window.localStorage.setItem('shoppingCart', JSON.stringify(updatedPanier));
  };

  return (
    <div className="w-full">
      {panier.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des items */}
          <div className="lg:col-span-2 space-y-4">
            {panier.map((item: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white shadow-card p-6 hover:shadow-card-hover transition-all duration-300"
              >
                <div className="flex gap-6">
                  {/* Image */}
                  {item.image && (
                    <div className="w-24 h-24 flex-shrink-0 bg-gray-100 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-xl integral-font text-dark mb-2 tracking-tight">
                      {item.name}
                    </h3>
                    <div className="space-font text-sm text-gray space-y-1">
                      <p>Prix unitaire: <span className="text-dark font-medium">{item.price.toFixed(2)}€</span></p>
                      <p>Quantité: <span className="text-dark font-medium">{item.quantity}</span></p>
                      <p className="text-base text-dark font-medium mt-2">
                        Total: {(item.price * item.quantity).toFixed(2)}€
                      </p>
                    </div>
                  </div>

                  {/* Boutons */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleAdd(index)}
                      className="w-10 h-10 flex items-center justify-center bg-dark text-light hover:bg-gray-800 transition-colors"
                    >
                      <span className="text-lg">+</span>
                    </button>
                    <button
                      onClick={() => handleRemove(index)}
                      className="w-10 h-10 flex items-center justify-center bg-gray-200 text-dark hover:bg-gray-300 transition-colors"
                    >
                      <span className="text-lg">-</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Résumé */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-card p-8 sticky top-24">
              <h2 className="text-2xl integral-font text-dark mb-6 tracking-tight">
                Résumé
              </h2>

              {/* Numéro de table */}
              <div className="mb-8">
                <label htmlFor="table" className="block text-sm space-font text-gray mb-3">
                  Numéro de table
                </label>
                <input
                  onChange={(e) => setTable(Number(e.target.value))}
                  value={table || ''}
                  id="table"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="Ex: 5"
                  className="w-full px-4 py-3 border border-light text-dark space-font focus:outline-none focus:border-dark transition-colors"
                  onKeyDown={(e) => {
                    if (
                      !/[0-9]/.test(e.key) &&
                      e.key !== 'Backspace' &&
                      e.key !== 'ArrowUp' &&
                      e.key !== 'ArrowDown' &&
                      e.key !== 'Tab'
                    ) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>

              {/* Total */}
              <div className="border-t border-light pt-6 mb-8">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="space-font text-gray">Sous-total</span>
                  <span className="integral-font text-dark text-lg">{total.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between items-baseline text-xl">
                  <span className="integral-font text-dark">Total</span>
                  <span className="integral-font text-dark">{total.toFixed(2)}€</span>
                </div>
              </div>

              {/* Bouton valider */}
              <ValideOrder table={table ?? 0} />
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20"
        >
          <div className="text-center">
            <p className="text-2xl integral-font text-dark mb-4">Votre panier est vide</p>
            <p className="text-gray space-font mb-8">Découvrez notre sélection de cocktails</p>
            <a
              href="/"
              className="inline-block px-8 py-4 bg-dark text-light space-font text-sm tracking-wider hover:bg-gray-800 transition-colors"
            >
              VOIR LA CARTE
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PanierListe;
