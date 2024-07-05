"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import trash from '../../../public/images/trash.png';

export interface Icart {
  id: string;
  totalPrice: number;
  panel_id: string;
  quantity: number;
  panel_image: string;
  panel_model: string;
  description: string;
}

const CartDetails: React.FC = () => {
  const [cartId, setCartId] = useState<string | null>(null);
  const [items, setItems] = useState<Icart[]>([]);

  useEffect(() => {
    const dataCartID = JSON.parse(localStorage.getItem('DataUser')!);
    const { cart } = dataCartID;
    setCartId(cart.id);
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


  const totalPrice = items.reduce((total, item) => total + item.totalPrice, 0);

  return (
    <div className="container mx-auto p-4 mt-24">
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        items.map(item => (
          <div key={item.id} className="flex justify-between items-center mb-4 p-4 border rounded bg-[#dadada]">
            <div className="flex items-center">
              <Image className="w-12 h-12 mr-4" src={item.panel_image} alt={item.panel_model} width={100} height={100} />
              <div>
                <h3 className="text-lg font-bold">{item.panel_model}</h3>
                <p className="text-gray-500">{item.description}</p>
                <p className="text-gray-500">${item.totalPrice}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-500">Quantity: {item.quantity}</p>
            </div>
          </div>
        ))
      )}
      <div className="flex justify-between items-center mt-4 p-4 border-t">
        <h2 className="text-xl font-bold">Total:</h2>
        <p className="text-xl font-bold">${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartDetails;
