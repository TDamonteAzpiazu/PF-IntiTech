"use client";
import { product_by_id } from "@/helpers/products.helper";
import { Iproducts_props } from "@/interfaces/interfaces";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ring2 } from 'ldrs'

interface Idetail_props {
  params: {
    id: string;
  };
}

const Product_detail: React.FC<Idetail_props> = ({ params }) => {
  ring2.register();
  const router = useRouter();
  const [data_product, setData_product] = useState<Iproducts_props | any>(null);
  const [productID, setProductID] = useState<string>("");
  const [cartID, setCartID] = useState<string | null>(null);
  const [data, setData ] = useState<any>(null);


  useEffect(() => {
    try {
      const dataUser = localStorage.getItem("DataUser");
      if (!dataUser) {
        throw new Error("DataUser not found in localStorage");
      }

      const dataCartID = JSON.parse(dataUser);
      setData(dataCartID);
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
    if(data.status === "pending") {
      alert("Debes activar tu cuenta para agregar items al carrito");
      router.push("/profile");
      return;
    }
    
    if (!cartID || !productID) {
      alert("Debes iniciar sesion para agregar items al carrito");
      router.push("/login");
      return;
    }


    try {
      const response = await fetch(`https://pf-intitech.onrender.com/cart/add/${cartID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          panel_id: productID,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        alert("Debes iniciar sesión para agregar items al carrito");
        return;
      }

      const data = await response.json();
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (!data_product) {
    return (
      <div className="h-screen mt-32 text-center bg-custom-image bg-no-repeat bg-size-200">
        <l-ring-2
          size="80"
          stroke="5"
          stroke-length="0.25"
          bg-opacity="0.1"
          speed="0.8"
          color="black"
        ></l-ring-2>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="h-9/12 w-full md:max-w-screen-xl bg-white rounded-lg shadow-xl p-8 flex flex-col md:flex-row justify-center items-center gap-8 mt-16 mb-16">
        <div className="relative w-96 h-96 mr-8">
          <Image
            className="rounded-l-md"
            src={data_product.image}
            alt="Product Image"
            layout="fill"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-5xl font-semibold text-gray-900">
                {data_product.brand}
              </h1>
              <span className="text-gray-900 text-sm">
                Stock: {data_product.stock}
              </span>
            </div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-2">
              {data_product.model}
            </h2>
            <p className="text-xl text-gray-900 mb-4">
              {data_product.description}
            </p>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <span className="text-gray-900 text-3xl font-semibold">
                $ {data_product.price}
              </span>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-xl text-gray-900">
                Daily Generation: {data_product.dailyGeneration}
              </span>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-yellow-300 to-orange-400 opacity-95 hover:shadow-xl text-gray-900 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product_detail;
