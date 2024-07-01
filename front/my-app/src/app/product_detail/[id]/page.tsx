"use client";
import { product_by_id } from "@/helpers/products.helper";
import product_by_id_prueba from "@/helpers/products.helper";
import { Iproducts_props } from "@/interfaces/interfaces";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Idetail_props {
  params: {
    id: string;
  };
}

const product_detail: React.FC<Idetail_props> = ({ params }) => {
  const [data_product, setData_product] = useState<Iproducts_props | undefined>(
    undefined
  );

  useEffect(() => {
    const get_product_by_id = async () => {
      try {
        const product = await product_by_id_prueba(params.id);
        setData_product(product);
      } catch (error) {
        console.error("Error en product_detail", error);
      }
    };
    get_product_by_id();
  }, [params.id]);
  console.log(data_product);

  if (!data_product) {
    return <div>...cargando</div>;
  }

  return (
    <div className="bg-black bg-opacity-10">

    
    <div className="flex justify-center items-center ">
      <div className="my-60 transform hover:scale-95 duration-300 rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
        <div className="bg-gradient-to-r from-yellow-300 via-orange-200 to-yellow-300 rounded-lg shadow-lg overflow-hidden w-full max-w-4xl flex transition-all duration-400 ">
          <div className="relative w-1/2 h-96">
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
                <h1 className="text-lg font-semibold text-gray-900">
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
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default product_detail;
