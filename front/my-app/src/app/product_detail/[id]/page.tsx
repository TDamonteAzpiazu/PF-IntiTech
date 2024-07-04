"use client";
import { product_by_id } from "@/helpers/products.helper";
import { Iproducts_props } from "@/interfaces/interfaces";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Idetail_props {
  params: {
    id: string;
  };
}


const Product_detail: React.FC<Idetail_props> = ({ params }) => {
  const [data_product, setData_product] = useState<Iproducts_props | undefined>(undefined);
  const [productID , setProductID] = useState<string>("");
  const [cartID, setCartID] = useState<string | null>(null);

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
  
      setCartID(dataCartID.cart.id);
    } catch (error) {
      console.error("Failed to load cart ID:", error);
    }
  }, []);

  useEffect(() => {
    const get_product_by_id = async () => {
      try {
        const product = await product_by_id(params.id);
        setData_product(product);
        setProductID(product.id!);
        console.log(product);
      } catch (error) {
        console.error("Error en product_detail", error);
      }
    };
    get_product_by_id();
  }, [params.id]);
  
  const handleAddToCart = async () => {
    try {
      const response = await fetch(`http://localhost:3000/cart/add/${cartID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          panel_id: productID,
          quantity: 1,
        }),
      })

      if (!response.ok) {
        alert ("Debes iniciar sesión para agregar items al carrito");
        
      }

      const data = await response.json();

      window.location.reload();
    
    } catch (error:any) {
      throw new Error(error);
    }
  }

  if (!data_product) {
    return <div className="h-screen mt-32 text-4xl text-center bg-custom-image bg-no-repeat bg-size-200">...Cargando</div>;
  }

  return (
    <div className="bg-black bg-opacity-10">
      <div className="flex justify-center items-center ">
        <div className="my-32  rounded-lg shadow-lg w-full max-w-4xl">
          <div className="bg-gradient-to-r from-yellow-300 via-orange-200 to-yellow-300 rounded-lg shadow-lg w-full max-w-4xl flex">
            <div className="relative w-1/2 h-[450px]">
              <Image
                className="object-cover w-full h-full"
                src={data_product.image}
                alt="Product Image"
                layout="fill"
              />
            </div>

            <div className="w-1/2 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-2xl py-5 font-semibold text-gray-900">
                    {data_product.brand}
                  </h1>
                  <span className="text-gray-600 text-sm">
                    Stock: {data_product.stock}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {data_product.model}
                </h2>

                <p className="text-sm text-gray-700 mb-4">
                  {data_product.description}
                </p>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <span className="text-gray-900 font-semibold">
                    $ {data_product.price}
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  <span className="text-sm text-gray-600">
                    Daily Generation: {data_product.dailyGeneration}
                  </span>
                </div>
                <div>
                  <button onClick={handleAddToCart} className="w-full outline-1 outline text-black bg-trasparent hover:bg-yellow-500 hover:text-white transition-all duration-300 font-medium py-2 px-4 rounded  ">
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product_detail;
