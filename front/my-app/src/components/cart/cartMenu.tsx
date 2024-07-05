import React, { useState, useEffect } from 'react';
import trash from '../../../public/images/trash.png';
import axios from 'axios';
import Image from 'next/image';
import ItemDetails from '../cartView';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

type CartProps = {
  isOpen: boolean;
  toggleCart: () => void;
};

export interface Icart {
  id: string;
  totalPrice: number;
  panel_id: string;
  quantity: number;
  panel_image: string;
  panel_model: string;
}

const Cart: React.FC<CartProps> = ({ isOpen, toggleCart }) => {
  const [cartId, setCartId] = useState<string | null>(null);
  const [items, setItems] = useState<Icart[]>([]);
  const [selectedItem, setSelectedItem] = useState<Icart | null>(null);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  useEffect(() => {
    initMercadoPago('TEST-fa93dbfd-43ff-4ad0-b01f-9fbd39faeafc', { locale: 'es-AR' });

  }, []);

  useEffect(() => {
    try {
      const dataUser = localStorage.getItem("DataUser");
      if (!dataUser) {
        throw new Error("DataUser not found in localStorage");
      }
      const dataCartID = JSON.parse(dataUser);
      if (!dataCartID || !dataCartID.cart || !dataCartID.cart.id) {
        throw new Error("Invalid data structure in DataUser");
      }

      setCartId(dataCartID.cart.id);
    } catch (error) {
      console.error("Failed to load cart ID:", error);
    }
  }, []);

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const res = await fetch(`http://localhost:3000/cart/getItems/${cartId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch cart items');
        }
        const data = await res.json();
        setItems(data);
      } catch (error: any) {
        console.log(error);
      }
    };

    if (cartId) {
      getCartItems();
    }
  }, [cartId]);

  const deleteItemFromCart = async (itemId: string) => {
    try {
      await axios.delete(`http://localhost:3000/cart/${itemId}`);
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting item from cart:', error);
      throw error;
    }
  };

  const deleteAllItemsFromCart = async () => {
    try {
      await axios.delete(`http://localhost:3000/cart/clearCart/${cartId}`);
      setItems([]); // Vacía el carrito en el estado
    } catch (error) {
      console.error('Error deleting all items from cart:', error);
      throw error;
    }
  };

  const subtractOneFromCartItem = async (itemId: string) => {
    try {
      const response = await axios.put(`http://localhost:3000/cart/substract/${itemId}`);
      const updatedItem = response.data;

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedItem.id
            ? { ...item, quantity: updatedItem.quantity, totalPrice: updatedItem.totalPrice }
            : item
        )
      );
    } catch (error) {
      console.error('Error subtracting item from cart:', error);
      throw error;
    }
  };

  const addOneToCartItem = async (itemId: string) => {
    try {
      const response = await axios.put(`http://localhost:3000/cart/add/${itemId}`);
      const updatedItem = response.data;

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedItem.id
            ? { ...item, quantity: updatedItem.quantity, totalPrice: updatedItem.totalPrice }
            : item
        )
      );
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  };

  const totalPrice = items.reduce((total, item) => total + item.totalPrice, 0);
  const createPreference = async () => {
    try {
        const res = await fetch('http://localhost:3000/mercadopago', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: [
                    {
                        id: items[0].id,
                        title: items[0].panel_model,
                        quantity: items[0].quantity,
                        unit_price: items[0].totalPrice,
                    },
                ],
            }),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error: any) {
        console.error('Error creating preference:', error.message);
        throw error;
    }
};

const handleClick = async () => {
    try {
        const preference = await createPreference();
        setPreferenceId(preference.preferenceId);
    } catch (error: any) {
        console.error('Error handling click:', error.message);
    }
};

  return (
    <>
      <div className={` fixed top-0 right-0 h-full w-1/4 bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col justify-between z-50`}>
        <div className="p-4">
          <h2 className="text-2xl mb-4 text-black">Shopping Cart</h2>
          <div className=''>
            {
              items.map(item => (
                <div key={item.id} className="flex justify-between text-black items-center mb-2 border-b border-gray-400 pb-4 ">
                  <div className="flex items-center">
                    <img className="w-12 h-12 mr-4" src={item.panel_image} alt={item.panel_model} />
                    <div>
                      <h3 className="text-lg font-bold">{item.panel_model}</h3>
                      <p className="text-gray-500">${item.totalPrice}</p>
                    </div>
                  </div>
                  <div className="flex items-right space-x-2">
                    {item.quantity > 1 && (
                      <button
                      onClick={() => subtractOneFromCartItem(item.id)}
                      title="Add New"
                      className="group cursor-pointer outline-none hover:rotate-90 duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25px"
                        height="25px"
                        viewBox="0 0 24 24"
                        className="stroke-zinc-400 fill-none group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
                      >
                        <path
                          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                          stroke-width="1.5"
                        ></path>
                        <path d="M8 12H16" stroke-width="1.5"></path>
                      </svg>
                    </button>
                    )}
                  
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => addOneToCartItem(item.id)}
                      title="Add New"
                      className="group cursor-pointer outline-none hover:rotate-90 duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25px"
                        height="25px"
                        viewBox="0 0 24 24"
                        className="stroke-zinc-400 fill-none group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
                      >
                        <path
                          d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                          stroke-width="1.5"
                        ></path>
                        <path d="M8 12H16" stroke-width="1.5"></path>
                        <path d="M12 16V8" stroke-width="1.5"></path>
                      </svg>
                    </button>
                  </div>
                  <button onClick={() => deleteItemFromCart(item.id)}>
                    <Image src={trash} alt="trash" width={30} height={30} />
                  </button>
                </div>
              ))
            }
          </div>
        </div>
        <div className="flex flex-col justify-center p-4 space-y-4">
          <div className="flex justify-between items-center mt-4 p-4 border-t">
            <h2 className="text-xl font-bold text-black">Total:</h2>
            <p className="text-xl font-bold text-black">${totalPrice.toFixed(2)}</p>
          </div>
        <button
            onClick={handleClick}
            className="w-full h-10 bg-yellowcustom bg-custom-radial bg-size-200 hover:bg-right text-white px-4 py-2 rounded-3xl transition-all duration-500 flex justify-center items-center">Buy</button>
            {preferenceId && <Wallet initialization={{ preferenceId }} />}
        <button onClick={deleteAllItemsFromCart} className="w-full h-10 bg-white cursor-pointer rounded-3xl border-2 border-red-500 shadow-[inset_0px_-2px_0px_1px_red-500] group hover:bg-red-500 transition duration-300 ease-in-out">
        <span className="font-medium text-[#000] group-hover:text-white">
            Clear Cart
            </span>
          </button>
          
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleCart}
      />
    </>
  );
};



export default Cart;
