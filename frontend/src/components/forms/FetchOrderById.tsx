import { fetchOrderById } from '../../services/orderService';

const FetchOrderById = ({ orderId }: { orderId: number }) => {
  const { data: order, isLoading, error } = fetchOrderById(orderId);
  console.log('Data Orders', order);
  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div>
      <h2> {order?.order_id}</h2>
      <h3> {order?.state} </h3>
    </div>
  );
};
export default FetchOrderById;
