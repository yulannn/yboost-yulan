import { useCreateOrder } from '../../services/orderService';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Check } from 'lucide-react';

interface ValideOrderProps {
  table: number;
}

const ValideOrder: React.FC<ValideOrderProps> = ({ table }) => {
  const { setPanierCount } = useCart();
  const { mutate, isPending, isError } = useCreateOrder();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const state = 'pending';

  const handleSubmit = async (): Promise<void> => {
    try {
      const cocktailsData = window.localStorage.getItem('shoppingCart');

      if (!cocktailsData) {
        setErrorMessage('Le panier est vide !');
        return;
      }

      const cocktails = JSON.parse(cocktailsData).map((cocktail: any) => ({
        cocktail_id: cocktail.id,
        quantity: cocktail.quantity,
      }));

      mutate(
        { table, cocktails, state },
        {
          onSuccess: () => {
            window.localStorage.removeItem('shoppingCart');
            setPanierCount(0);
            window.location.href = `/order-success?table=${table}`;
          },
          onError: (error) => {
            setErrorMessage("Erreur lors de l'envoi de la commande !");
            console.error('Erreur:', error);
          },
        },
      );
    } catch (error) {
      console.error('Erreur JSON parsing:', error);
      setErrorMessage('Données du panier invalides !');
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleSubmit}
        disabled={isPending || !table}
        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-dark text-light space-font text-sm tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Check size={20} />
        {isPending ? 'ENVOI EN COURS...' : 'VALIDER LA COMMANDE'}
      </button>

      {errorMessage && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200">
          <p className="text-red-600 text-sm space-font">{errorMessage}</p>
        </div>
      )}

      {isError && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200">
          <p className="text-red-600 text-sm space-font">Une erreur s'est produite.</p>
        </div>
      )}
    </div>
  );
};

export default ValideOrder;
