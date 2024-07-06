'use client';
import React, { useEffect, useState } from "react";

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
          const res = await fetch(`http://localhost:3000/cart/getAllRecords/${dataUser.id}`, {
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
    <div className="h-screen mt-32">
      <h1>Orders</h1>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={order.record.id}>
            <h2>Order {index + 1}</h2>
            <p>Order ID: {order.record.id}</p>
            <p>Total Price: {order.record.totalPrice}</p>
            <h3>Items:</h3>
            <ul>
              {order.record.items.map((item) => (
                <li key={item.id}>
                  <img src={item.panel_image} alt={item.panel_model} width={50} height={50} />
                  <p>Model: {item.panel_model}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total Price: ${item.totalPrice}</p>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default Orders;
