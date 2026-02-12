import { useCart } from '../context/CartContext';

interface AddButtonProps {
  cocktail_id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem {
  id: number;
  quantity: number;
}

const AddButton: React.FC<AddButtonProps> = ({
  cocktail_id,
  name,
  price,
  image,
}) => {
  const { updatePanierCount } = useCart();

  const addStorage = async () => {
    try {
      const cartKey = 'shoppingCart';
      const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
      const existingItem: CartItem | undefined = cart.find(
        (item: CartItem) => item.id === cocktail_id,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: cocktail_id,
          quantity: 1,
          name: name,
          price: price,
          image: image,
        });
      }

      localStorage.setItem(cartKey, JSON.stringify(cart));

      const totalItems = cart.reduce(
        (total: number, item: CartItem) => total + item.quantity,
        0,
      );

      updatePanierCount(totalItems);

      console.log(`Cocktail ${cocktail_id} ajouté ou mis à jour.`);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du panier :', error);
    }
  };

  return (
    <button
      onClick={addStorage}
      className="relative bg-custom hover:cursor-pointer text-white integral-font text-md py-2 px-4 rounded mt-4 backdrop-blur-sm border border-gray-700/30 opacity-90 hover:opacity-100 overflow-hidden group"
    >
      <span className="relative z-10">Ajouter à la commande</span>
      <div className="absolute inset-0 bg-custom-violet transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </button>
  );
};

export default AddButton;
