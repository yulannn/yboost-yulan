import { useState, useEffect } from "react";
import { useUpdateOrder } from "../../services/orderService";

interface ButtonOrderReadyProps {
  order: number;
  state: string;
}

const ButtonOrderReady = ({ order, state }: ButtonOrderReadyProps) => {
  const { mutate } = useUpdateOrder();
  const [isChecked, setIsChecked] = useState(state === "ready");

  useEffect(() => {
    setIsChecked(state === "ready");
  }, [state]);

  const handleSubmit = (): void => {
    let newState;
    if (state === "pending") {
      newState = "ready";
    } else if (state === "ready") {
      newState = "completed";
    } else if (state === "completed") {
      newState = "history";
    } else {
      newState = "pending";
    }

    console.log('Mise à jour de la commande:', { orderId: order, newState });

    mutate(
      { orderId: order, state: newState },
      {
        onSuccess: () => {
          console.log(`Commande mise à jour vers ${newState} !`);
          setIsChecked(newState === "ready");
        },
        onError: (error) => {
          console.error("Erreur lors de la mise à jour:", error);
        },
      }
    );
  };

  const getButtonText = () => {
    switch (state) {
      case "pending":
        return "Marquer comme prête";
      case "ready":
        return "Marquer comme servie";
      case "completed":
        return "Marquer comme historique";
      default:
        return "Marquer comme en attente";
    }
  };

  return (
    <button
      onClick={handleSubmit}
      className="bg-custom-violet text-white font-semibold py-2 px-4 rounded-lg hover:bg-custom-violet/80 focus:outline-none focus:ring-2 focus:ring-custom-violet focus:ring-opacity-50"
    >
      {getButtonText()}
    </button>
  );
};

export default ButtonOrderReady;
