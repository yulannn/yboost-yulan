import React, { createContext, useContext, useState } from "react";

interface CartContextType {
  panierCount: number;
  updatePanierCount: (count: number) => void;
  setPanierCount: React.Dispatch<React.SetStateAction<number>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [panierCount, setPanierCount] = useState(0);

  const updatePanierCount = (count: number) => {
    setPanierCount(count);
  };

  return (
    <CartContext.Provider value={{ panierCount, updatePanierCount, setPanierCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
