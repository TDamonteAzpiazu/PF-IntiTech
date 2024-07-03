import { useState, createContext, useContext } from 'react';
import React from 'react';
import Cart from '../components/cart/cartMenu'; 
import { ReactNode } from 'react';

const CartContext = createContext<{ openCart: boolean; toggleCart: () => void } | null>(null);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [openCart, setOpenCart] = useState(false);

  const toggleCart = () => {
    setOpenCart(!openCart);
  };

  return (
    <CartContext.Provider value={{ openCart, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;