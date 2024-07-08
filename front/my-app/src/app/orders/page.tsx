'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
interface Item {
  id: string;
  totalPrice: number;
  panel_id: string;
  quantity: number;
  panel_image: string;
  panel_model: string;
}

interface Record {
  id: string;
  totalPrice: number;
  items: Item[];
}

interface ResponseData {
  record: Record;
}
export const api_url = process.env.NEXT_PUBLIC_API_URL;

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<ResponseData[]>([]);
  const [dataUser, setDataUser] = useState<any | null>(null);

  useEffect(() => {
    const storage = localStorage.getItem('DataUser');
    if (storage) {
      setDataUser(JSON.parse(storage));
    }
  }, []);

  console.log(dataUser);

  useEffect(() => {
    if (dataUser) {
      const getOrders = async () => {
        console.log('llego hasta aqui');
        try {
          const res = await fetch(`${api_url}/cart/getAllRecords/${dataUser.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await res.json();
          setOrders(data);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      };
      getOrders();
    }
  }, [dataUser]);

  return (
    <div className="h-screen mt-32 px-4">
      <h1 className="text-3xl font-semibold mb-6 text-center">Orders</h1>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div
            key={order.record.id}
            className="grid grid-cols-2 mt-2 transition-all hover:shadow-2xl rounded-lg justify-center gap-1 h-60 bg-gradient-to-r from-orangeinti to-lightorangeinti opacity-85"
          >
            <div className="px-4 py-4 bg-transparent rounded-l-md">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Order {index + 1}</h2>
              <p className="text-lg text-gray-900 mb-1">Order ID: {order.record.id}</p>
              <p className="text-lg text-gray-900 mb-1">Total Price: ${order.record.totalPrice}</p>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Items:</h3>
              <ul>
                {order.record.items.map((item) => (
                  <li key={item.id} className="flex items-center mb-2">
                    <div className="relative h-16 w-16 mr-4">
                      <Image
                        src={item.panel_image}
                        alt={item.panel_model}
                        layout="fill"
                        className="rounded-md"
                      />
                    </div>
                    <div>
                      <p className="text-lg text-gray-900">Model: {item.panel_model}</p>
                      <p className="text-md text-gray-900">Quantity: {item.quantity}</p>
                      <p className="text-md text-gray-900">Total Price: ${item.totalPrice}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-lg text-gray-900">No orders found</p>
      )}
    </div>
  );
};

export default Orders;