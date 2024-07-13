import React, { useState, useEffect } from 'react';
import trash from '../../../public/images/trash.png';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { DataStore } from "@/store/dataStore";
import { Icart } from '@/interfaces/interfaces';

type CartProps = {
  isOpen: boolean
  toggleCart: () => void
}

const Cart: React.FC<CartProps> = ({ isOpen, toggleCart }) => {
  const [items, setItems] = useState<Icart[]>([]);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const router = useRouter();
  const userData = DataStore((state) => state.userDataUser);
  const getDataUser = DataStore((state) => state.getDataUser);

  useEffect(() => {
    getDataUser();
  }, [getDataUser]);

  useEffect(() => {
    initMercadoPago('TEST-fa93dbfd-43ff-4ad0-b01f-9fbd39faeafc', { locale: 'es-AR' });
  }, []);

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const res = await fetch(`https://pf-intitech.onrender.com/cart/getItems/${userData.cart?.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch cart items')
        }
        const data = await res.json()
        setItems(data)
      } catch (error: any) {
        console.log(error)
      }
    }
    if (userData.cart?.id) {
      getCartItems();
    }
  }, [userData.cart?.id]);

  const deleteItemFromCart = async (itemId: string) => {
    try {
      await axios.delete(`https://pf-intitech.onrender.com/cart/${itemId}`)
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
    } catch (error) {
      console.error('Error deleting item from cart:', error)
      throw error
    }
  }

  const deleteAllItemsFromCart = async () => {
    try {
      await axios.delete(`https://pf-intitech.onrender.com/cart/clearCart/${userData.cart?.id}`);
      setItems([]); // Vacía el carrito en el estado
    } catch (error) {
      console.error('Error deleting all items from cart:', error)
      throw error
    }
  }

  const subtractOneFromCartItem = async (itemId: string) => {
    try {
      const response = await axios.put(
        `https://pf-intitech.onrender.com/cart/substract/${itemId}`
      )
      const updatedItem = response.data

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedItem.id
            ? {
                ...item,
                stock: updatedItem.stock,
                quantity: updatedItem.quantity,
                totalPrice: updatedItem.totalPrice,
              }
            : item
        )
      )
    } catch (error) {
      console.error('Error subtracting item from cart:', error)
      throw error
    }
  }

  const addOneToCartItem = async (itemId: string) => {
    try {
      const response = await axios.put(
        `https://pf-intitech.onrender.com/cart/add/${itemId}`
      )
      const updatedItem = response.data

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedItem.id
            ? {
                ...item,
                stock: updatedItem.stock,
                quantity: updatedItem.quantity,
                totalPrice: updatedItem.totalPrice,
              }
            : item
        )
      )
    } catch (error) {
      console.error('Error adding item to cart:', error)
      throw error
    }
  }

  const totalPrice = items.reduce((total, item) => total + item.totalPrice, 0)

  const createPreference = async () => {
    try {
      const res = await fetch('https://pf-intitech.onrender.com/mercadopago', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            title: item.panel_model,
            quantity: item.quantity,
            unit_price: item.totalPrice / item.quantity,
            stock: item.stock
          })),
        }),
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      return data
    } catch (error: any) {
      console.error('Error creating preference:', error.message)
      throw error
    }
  };

  const handleClick = async () => {
    try {
      if(userData.status === "pending"){
        alert('Debes activar tu cuenta para ver el carrito de compras, revisa tu correo para activarla');
        toggleCart();
        router.push('/profile');
        return;
      }
      const preference = await createPreference()
      setPreferenceId(preference.preferenceId)
    } catch (error: any) {
      console.error('Error handling click:', error.message)
    }
  }

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-1/4 bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col justify-between z-50`}
      >
        <div className="p-4 overflow-y-auto h-3/4">
          <h2 className="text-2xl mb-4 text-black text-center">
            Carrito de compras
          </h2>
          <div>
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-black items-center mb-2 border-b border-gray-400 pb-4 "
              >
                <div className="flex items-center">
                  <Image
                    className="w-12 h-12 mr-4"
                    src={item.panel_image}
                    alt={item.panel_model}
                  />
                  <div>
                    <h3 className="text-lg font-bold">{item.panel_model}</h3>
                    <p className="text-gray-500">${item.totalPrice}</p>
                    <p className="text-gray-500">Stock: {item.stock}</p>
                  </div>
                </div>
                <div className="flex items-right space-x-2">
                  {item.quantity > 1 && (
                    <button
                      onClick={() => subtractOneFromCartItem(item.id)}
                      title="Subtract One"
                      className="group cursor-pointer outline-none hover:rotate-180 duration-300"
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
                  {/* {item.quantity < item.stock && ( */}
                    <button
                      onClick={() => addOneToCartItem(item.id)}
                      title="Add One"
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
                        <path d="M12 8V16" stroke-width="1.5"></path>
                      </svg>
                    </button>
                  {/* )} */}
                </div>
                <button
                  onClick={() => deleteItemFromCart(item.id)}
                  title="Delete"
                  className="group cursor-pointer outline-none hover:rotate-90 duration-300"
                >
                  <Image
                    src={trash}
                    alt="delete"
                    width={25}
                    height={25}
                    className="stroke-zinc-400 fill-none group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 border-t border-gray-200">
          <p className="text-lg font-bold text-black mb-2">Total: ${totalPrice.toFixed(2)}</p>
          <button
            onClick={handleClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Proceder al pago
          </button>
          <button
            onClick={deleteAllItemsFromCart}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ml-2"
          >
            Vaciar Carrito
          </button>
        </div>
      </div>
      <div
        className={`fixed inset-0 bg-black opacity-50 transition-opacity duration-300 ${
          isOpen ? 'block' : 'hidden'
        }`}
        onClick={toggleCart}
      ></div>
    </>
  )
}

export default Cart;
