import DeleterOrder from '../button/DeleteOrderButton';
import ButtonOrderReady from '../button/ButtonOrderReady';
import { fetchAllOrders } from "../../services/orderService";
import { fetchAllCocktails } from "../../services/cocktailService";
import { useUpdateOrderEmployee } from '../../services/orderService';
import { AuthContext } from '../../features/auth/AuthContext';
import { useContext } from 'react';
import { CheckCircle, Hash, Table as TableIcon } from "lucide-react";

const OrderReady = () => {
  const { data, isLoading, isError } = fetchAllOrders();
  const { authState } = useContext(AuthContext) || {};
  const { mutate } = useUpdateOrderEmployee();
  const { data: cocktailsData, isLoading: cocktailsIsLoading, isError: cocktailsIsError } = fetchAllCocktails();

  const readyOrders = data?.filter((order) => order.state === "ready");

  const updateOrderEmployeeId = ({ orderId }: { orderId: number }) => {
    if (authState?.user?.employee_id !== undefined) {
      mutate({ orderId, employeeId: authState.user.employee_id });
    } else {
      console.error("Employee ID is undefined");
    }
  }

  if (isLoading || cocktailsIsLoading)
    return <div className="text-center space-font text-gray py-12">Chargement...</div>;

  if (isError || cocktailsIsError)
    return <div className="text-center space-font text-red-600 py-12">Erreur lors du chargement</div>;

  if (!readyOrders || readyOrders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray space-font">Aucune commande prête</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {readyOrders?.map((order) => (
        <div
          onClick={() => updateOrderEmployeeId({ orderId: order.order_id })}
          className="bg-white shadow-card p-6 hover:shadow-card-hover transition-all duration-300 relative cursor-pointer"
          key={order.order_id}
        >
          {/* Badge et actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <ButtonOrderReady order={order.order_id} state={order.state} />
          </div>

          <div className="absolute bottom-4 right-4">
            <DeleterOrder orderId={order.order_id} />
          </div>

          {/* Informations principales */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2">
              <Hash size={16} className="text-gray" />
              <span className="text-sm space-font text-gray">
                Commande <span className="text-dark font-medium">#{order.order_id}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TableIcon size={16} className="text-gray" />
              <span className="text-sm space-font text-gray">
                Table <span className="text-dark font-medium">{order.nb_table}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              <span className="inline-block px-3 py-1 bg-green-50 border border-green-200 text-xs space-font text-green-700">
                PRÊTE
              </span>
            </div>
          </div>

          {/* Liste des cocktails */}
          <div className="pt-4 border-t border-light pr-16">
            <h3 className="text-sm integral-font text-dark mb-3 tracking-tight">
              Cocktails
            </h3>
            <ul className="space-y-2">
              {order.orderCocktails?.map((orderCocktail) => {
                const cocktail = cocktailsData?.find((c) => c.cocktail_id === orderCocktail.cocktail_id);
                return cocktail ? (
                  <li key={cocktail.cocktail_id} className="flex justify-between items-center text-sm">
                    <span className="space-font text-dark">
                      {orderCocktail.quantity}x {cocktail.name}
                    </span>
                    <span className="space-font text-gray">
                      {(orderCocktail.quantity * cocktail.price).toFixed(2)}€
                    </span>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderReady;