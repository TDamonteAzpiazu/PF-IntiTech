import React, { useState, useEffect } from 'react';
import axios from 'axios';



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
        const res = await fetch(`http://localhost:3000/cart/getItems/${cartId}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }) ;
        if(!res.ok){
          throw new Error('Failed to fetch cart items');
        }
        const data = await res.json();
        setItems(data);
        return data
      } catch (error:any) {
        console.log(error);
      }
    }

    getCartItems();
  },[cartId])

  console.log(items)
 

  const deleteItemFromCart = async (itemId: string) => {
    try {
      await axios.delete(`http://localhost:3000/cart/${itemId}`);
      setItems(items.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting item from cart:', error);
      throw error;
    }
  };

  const deleteAllItemsFromCart = async () => {
    try {
      await axios.delete(`http://localhost:3000/cart/clearCart/${cartId}`);
    } catch (error) {
      console.error('Error deleting all items from cart:', error);
      throw error;
    }
  };

  const subtractOneFromCartItem = async (itemId: string) => {
    try {
      const response = await axios.put(`http://localhost:3000/cart/substract/${itemId}`);
      return response.data;
    } catch (error) {
      console.error('Error subtracting item from cart:', error);
      throw error;
    }
  };

  const addOneToCartItem = async (itemId: string) => {
    try {
      const response = await axios.put(`http://localhost:3000/cart/add/${itemId}`);
      return response.data;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  };

  return (
    <>
      <div className={`fixed top-0 right-0 h-full w-1/4 bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col justify-between z-50`}>
        <div className="p-4">
          <h2 className="text-2xl mb-4 text-black">Shopping Cart</h2>
          <div>
            {
              items.map(item => (
                <div key={item.id} className="flex justify-between text-black items-center mb-2">
                  <div className="flex items-center">
                    <img className="w-12 h-12 mr-4" src={item.panel_image} alt={item.panel_model} />
                    <div>
                      <h3 className="text-lg font-bold">{item.panel_model}</h3>
                      <p className="text-gray-500">{item.totalPrice}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button onClick={() => subtractOneFromCartItem(item.id)}>-</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button onClick={() => addOneToCartItem(item.id)}>+</button>
                  </div>
                  <button onClick={() => deleteItemFromCart(item.id)}>X</button>
                </div>
              ))
            }
          </div>
        </div>
        <div className="flex justify-center p-4">
          <button className="w-9/12 h-10 bg-yellowcustom bg-custom-radial bg-size-200 hover:bg-right text-white px-4 py-2 rounded-3xl transition-all duration-500 flex justify-center items-center"onClick={() => deleteAllItemsFromCart()}>Clear Cart</button>
          <button className="w-9/12 h-10 bg-yellowcustom bg-custom-radial bg-size-200 hover:bg-right text-white px-4 py-2 rounded-3xl transition-all duration-500 flex justify-center items-center">Buy</button>
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
