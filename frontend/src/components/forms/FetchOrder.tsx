import { fetchAllOrders } from '../../services/orderService';

const FetchOrders = () => {
  const { data: orders, isLoading, error } = fetchAllOrders();
  console.log('Data Orders', orders);

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div>
      {orders?.map((order) => (
        <div key={order.order_id}>
          <h3> {order.nb_table} </h3>
          <h4> {order.state} </h4>
        </div>
      ))}
    </div>
  );
};
export default FetchOrders;
