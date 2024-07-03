import { useState } from 'react';

const Cart = ({ isOpen, toggleCart }: { isOpen: boolean, toggleCart: () => void }) => {
  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-1/4 bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <h2 className="text-2xl mb-4 text-black">Shopping Cart</h2>
          {/* Aquí puedes agregar la lógica y el contenido del carrito de compras */}
          <ul>
            <li className="py-2">Product 1</li>
            <li className="py-2">Product 2</li>
            <li className="py-2">Product 3</li>

          </ul>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleCart}
      />
    </>
  );
};

export default Cart;