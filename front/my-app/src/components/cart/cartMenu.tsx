import React, { useState, useEffect } from 'react';
import axios from 'axios';

type CartProps = {
  isOpen: boolean;
  toggleCart: () => void;
};

const Cart: React.FC<CartProps> = ({ isOpen, toggleCart }) => {
  const [cartId, setCartId] = useState<string | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedDataUser = localStorage.getItem('DataUser');
    if (storedDataUser) {
      const dataUser = JSON.parse(storedDataUser);
      const cartId = dataUser.cart?.id;
      if (cartId) {
        setCartId(cartId);
        console.log('este es el cartId', cartId);
      } else {
        console.error('Cart ID not found in user data');
      }
    } else {
      console.error('No user data found in localStorage');
    }
  }, []);

  useEffect(() => {
    if (cartId) {
      const fetchCartData = async () => {
        setLoading(true);
        try {
          const cartItems = await getCartItems(cartId);
          setItems(cartItems);
        } catch (error) {
          console.error('Error fetching cart data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchCartData();
    }
  }, [cartId]);

  const getCartItems = async (cartId: string) => {
    try {
      console.log('Fetching cart items for cartId:', cartId);
      const response = await axios.get(`http://localhost:3000/cart/getItems/${cartId}`);
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response data:', error.response.data);
        }
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  };

  const deleteItemFromCart = async (itemId: string) => {
    try {
      await axios.delete(`http://localhost:3000/cart/${itemId}`);
      setItems(items.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting item from cart:', error);
      throw error;
    }
  };

  const deleteAllItemsFromCart = async (cartId: string) => {
    try {
      await axios.delete(`http://localhost:3000/cart/clearCart/${cartId}`);
      setItems([]);
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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-1/4 bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col justify-between z-50`}
      >
        <div className="p-4">
          <h2 className="text-2xl mb-4 text-black">Shopping Cart</h2>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                {item.panel_id} - {item.quantity} - ${item.totalPrice}
                <button onClick={() => subtractOneFromCartItem(item.id)}>-</button>
                <button onClick={() => addOneToCartItem(item.id)}>+</button>
                <button onClick={() => deleteItemFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center p-4">
          <button onClick={() => cartId ? deleteAllItemsFromCart(cartId) : null}>Clear Cart</button>
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

export const createCart = async () => {
  try {
    const response = await axios.post('http://localhost:3000/cart');
    return response.data;
  } catch (error) {
    console.error('Error creating cart:', error);
    throw error;
  }
};

export const subtractOneFromCartItem = async (itemId: string) => {
  try {
    const response = await axios.put(`http://localhost:3000/cart/items/${itemId}/subtract`);
    return response.data;
  } catch (error) {
    console.error('Error subtracting item from cart:', error);
    throw error;
  }
};

export const addToCartItem = async (cartId: string, itemId: string, quantity: number) => {
  try {
    const response = await axios.post(`http://localhost:3000/cart/add/${cartId}`, {
      panel_Id: itemId,
      quantity: quantity
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    throw error;
  }
};

export default Cart;
