"use client";
import { product_by_id } from "@/helpers/products.helper";
import { Iproducts_props } from "@/interfaces/interfaces";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";


interface Idetail_props {
  params: {
    id: string;
  };
}

const Product_detail: React.FC<Idetail_props> = ({ params }) => {
  const router = useRouter();
  const [data_product, setData_product] = useState<Iproducts_props | any>();
  const [productID, setProductID] = useState<string>("");
  const [cartID, setCartID] = useState<string | null>(null);
  // const [data, setData ] = useState<any>(null);
  const dataUser = useSelector((state: any) => state.user.userData);


  useEffect(() => {
    try {
      // const dataUser = localStorage.getItem("DataUser");
      if (!dataUser) {
        throw new Error("Usuario no encontrado");
      }

      // const storageUser = JSON.parse(dataUser);
      // setData(dataUser);
      if (!dataUser || !dataUser.cart || !dataUser.cart.id) {
        throw new Error("Invalid data structure in DataUser");
      }

      setCartID(dataUser.cart.id);

    } catch (error) {
      console.error("Failed to load cart ID:", error);
    }
  }, []);

  useEffect(() => {
    console.log("llega hasta aqui")
    const get_product_by_id = async (): Promise<void> => {
      try {
        const product = await product_by_id(params.id);
        console.log(product)
        setData_product(product);
        setProductID(product?.id!);
      } catch (error) {
        console.error("Error en product_detail", error);
      }
    };
    get_product_by_id();
  }, [params.id]);

  const handleAddToCart = async () => {
    if(dataUser.status === "pending") {
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
  console.log(data_product)

  if (!data_product) {
    return (
      <div className="h-screen mt-32 text-center bg-custom-image bg-no-repeat bg-size-200">
        <h1 className="text-4xl font-bold text-white">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="h-screen">
    <div className="grid grid-cols-2 shadow-2xl rounded-lg justify-center gap-1 mt-40 mb-20 mx-24">
      <div className="relative sm:60 sm:w-60">
        <Image
          className="rounded-l-md"
          src={data_product.image}
          alt="Product Image"
          layout="fill"
        />
      </div>
      <div className="px-4 py-4 bg-gradient-to-r from-orange-400 to-orange-200 bg-transparent opacity-85 rounded-r-md justify-center ">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl py-5 font-semibold text-gray-900">
              {data_product.brand}
            </h1>
            <span className="text-gray-900 text-sm">
              Stock: {data_product.stock}
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {data_product.model}
          </h2>
          <p className="text-sm text-gray-900 mb-4">
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
            <span className="text-sm text-gray-900">
              Daily Generation: {data_product.dailyGeneration}
            </span>
          </div>
          <div>
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-yellow-300 to-orange-400 opacity-95 hover:shadow-xl text-gray-900 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Product_detail;
