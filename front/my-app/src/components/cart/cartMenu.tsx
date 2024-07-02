import { useState } from 'react';

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-1/4 bg-black shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button onClick={toggleCart} className="absolute top-4 right-4 z-50 text-black p-2 rounded-md">
          Close
        </button>
        <div className="p-4">
          <h2 className="text-2xl mb-4">Shopping Cart</h2>
          {/* nashe */}
          {/* logica de carrito */}
          <ul>
            <li className="py-2">Producto 1</li>
            <li className="py-2">Producto 2</li>
            <li className="py-2">Producto 3</li>
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