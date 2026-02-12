import { deleteOrderService } from "../../services/orderService";
import { fetchAllOrders } from "../../services/orderService";

interface DeleterOrderProps {
  orderId: number;
}

const DeleterOrder = ({ orderId }: DeleterOrderProps) => {

  const { refetch } = fetchAllOrders();

  const handleDelete = () => {
    deleteOrderService.deleteOrder(orderId)
      .then(() => {
        console.log('Commande supprimée !');
        refetch();
      })
      .catch((error) => {
        console.error('Erreur:', error);
      });
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 absolute bottom-0 right-0 m-4">
      Supprimer
    </button>
  );
}

export default DeleterOrder;
