import OrderPending from "../cards/OrderPending";
import OrderReady from "../cards/OrderReady";
import OrderHistory from "../cards/OrderHistory";

const Commande = () => {
  return (
    <div className="flex flex-col gap-12">
      <div>
        <h2 className="text-2xl integral-font text-dark mb-6 tracking-tight">
          Commandes en cours
        </h2>
        <OrderPending />
      </div>

      <div>
        <h2 className="text-2xl integral-font text-dark mb-6 tracking-tight">
          Commandes prêtes
        </h2>
        <OrderReady />
      </div>

      <div>
        <h2 className="text-2xl integral-font text-dark mb-6 tracking-tight">
          Historique
        </h2>
        <OrderHistory />
      </div>
    </div>
  );
}

export default Commande;
