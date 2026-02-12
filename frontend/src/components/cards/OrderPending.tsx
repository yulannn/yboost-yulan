import { fetchAllOrders } from "../../services/orderService";
import { fetchAllCocktails } from "../../services/cocktailService";
import ButtonOrderReady from "../button/ButtonOrderReady";
import { useState, useEffect } from "react";
import { OrderFetchData } from "../../types/OrderFetchData";
import { Clock, Hash, Table as TableIcon } from "lucide-react";

const OrderPending = () => {
  const [pendingOrders, setPendingOrders] = useState<OrderFetchData[]>([]);
  const { data, isLoading, isError } = fetchAllOrders();
  const { data: cocktailsData, isLoading: cocktailsIsLoading, isError: cocktailsIsError } = fetchAllCocktails();

  useEffect(() => {
    if (data) {
      setPendingOrders(data.filter((order) => order.state === "pending"));
    }
  }, [data]);

  if (isLoading || cocktailsIsLoading)
    return <div className="text-center space-font text-gray py-12">Chargement...</div>;

  if (isError || cocktailsIsError)
    return <div className="text-center space-font text-red-600 py-12">Erreur lors du chargement</div>;

  if (pendingOrders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray space-font">Aucune commande en cours</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {pendingOrders?.map((order) => (
        <div
          className="bg-white shadow-card p-6 hover:shadow-card-hover transition-all duration-300 relative"
          key={order.order_id}
        >
          {/* Badge statut */}
          <div className="absolute top-4 right-4">
            <ButtonOrderReady order={order.order_id} state={order.state} />
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
              <Clock size={16} className="text-orange-500" />
              <span className="inline-block px-3 py-1 bg-orange-50 border border-orange-200 text-xs space-font text-orange-700">
                EN COURS
              </span>
            </div>
          </div>

          {/* Liste des cocktails */}
          <div className="pt-4 border-t border-light">
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

export default OrderPending;