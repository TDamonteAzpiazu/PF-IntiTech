"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { DataStore } from "@/store/dataStore";
import { ResponseData } from "@/interfaces/interfaces";
import BotonProducts from "@/components/botonProducts";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
import Link from "next/link";

const Orders: React.FC = () => {
  const userData = DataStore((state) => state.userDataUser);
  const getDataUser = DataStore((state) => state.getDataUser);
  const [orders, setOrders] = useState<ResponseData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState<ResponseData[]>([]);

  useEffect(() => {
    getDataUser();
  }, [getDataUser]);


  useEffect(() => {
    if (userData) {
      const getOrders = async () => {
        console.log("llego hasta aqui");
        try {
          const res = await fetch(
            `http://localhost:3000/cart/getAllRecords/${userData.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!res.ok) {
            throw new Error("Network response was not ok");
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
  }, [userData]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = orders.filter((order) =>
        order.record.items.some((item) =>
          item.panel_model.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  }, [searchTerm, orders]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} de ${month} de ${year}`;
  };

  const handleShowMore = (order: ResponseData) => {
    MySwal.fire({
      width: "80%",
      title: "Detalles de la compra",
      padding: "1em",
      confirmButtonColor: "black",
      confirmButtonText: "Volver",
      html: (
        <div className="flex flex-col gap-4 w-full  overflow-y-auto h-96">
          {order.record.items.map((item) => (
            <li
              key={item.id}
              className="flex items-center h-48 mb-6 shadow-lg rounded-lg border border-gray-200/40 "
            >
              <div className=" flex h-full items-center w-full">
                <div className="relative h-[90%] w-32 mr-4 p-2 rounded-lg">
                  <Image
                    src={item.panel_image}
                    alt={item.panel_model}
                    layout="fill"
                  />
                </div>
                <div className=" flex flex-col gap-1 h-full w-full text-left p-2">
                  <p className="text-lg text-gray-900">
                    Nombre de la marca - {item.panel_model}
                  </p>
                  <p className="text-sm ">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Facere obcaecati iusto atque ipsum quos ipsam eos animi
                    maiores possimus, amet reiciendis assumenda
                  </p>
                  <p className="text-base text-gray-900">
                    Precio por unidad: ${item.totalPrice}
                  </p>
                  <p className="text-sm text-gray-900">
                    {item.quantity} unidades
                  </p>
                </div>
              </div>
            </li>
          ))}
        </div>
      ),
    });
  };

  return (
    <div className="mb-10 mt-10">
      <div className="flex justify-between items-center pb-10 px-14">
        <h1 className="text-3xl font-medium">Historial de compras</h1>
        <div className="flex justify-center gap-3 items-center">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-1 border-2 border-black rounded-md focus:outline-none"
            type="search"
            placeholder={"Buscar..."}
          />
        </div>
      </div>
      <div className="px-24">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order.record.id}
              className="h-56 overflow-hidden mb-10 bg-white shadow-lg rounded-xl"
            >
              <div className="px-4 pb-4 pt-2 bg-transparent rounded-l-md">
                <p className="pl-4 text-sm font-medium text-gray-900 mb-2 flex gap-7 items-center">
                  {formatDate(order.record.date)}{" "}
                  <p className="uppercase text-green-500 text-xs">Pagado</p>
                </p>
                <div className="w-full border border-gray-300"></div>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-medium text-gray-900 mb-2 pt-3">
                    Total pagado: ${order.record.totalPrice}
                  </p>
                  <p className="text-xs text-gray-900 mb-2">
                    ID de transacción: {order.record.id}
                  </p>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2 pl-2">
                  Producto:
                </h3>
                <div className=" h-24 ">
                  {order.record.items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between h-full"
                    >
                      <div className=" flex h-full items-center w-3/4">
                        <div className="relative h-16 w-16 mr-4">
                          <Image
                            src={item.panel_image}
                            alt={item.panel_model}
                            layout="fill"
                          />
                        </div>
                        <div className="pl-2 flex flex-col gap-1">
                          <p className="text-lg text-gray-900">
                            Nombre de la marca - {item.panel_model}
                          </p>
                          <p className="text-base text-gray-900">
                            Precio por unidad: ${item.totalPrice}
                          </p>
                          <p className="text-sm text-gray-900">
                            {item.quantity} unidades
                          </p>
                        </div>
                      </div>
                      <div onClick={() => handleShowMore(order)}>
                        <BotonProducts title="Ver más detalles" />
                      </div>
                    </li>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p className="text-center pt-10 text-lg text-gray-900">
              No se encontraron compras con ese nombre
            </p>
            <Link className="flex justify-center pt-10" href="/products">
              <button className="px-6 py-2 bg-black text-white border border-black rounded-lg hover:scale-105 transition-all duration-500 ease-in-out">
                Ir a comprar
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
