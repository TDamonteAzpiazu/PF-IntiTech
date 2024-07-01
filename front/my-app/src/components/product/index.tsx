import React from "react";
import Image from "next/image";
import { Iproducts_props } from "@/interfaces/interfaces";
import Link from "next/link";

const Product: React.FC<Iproducts_props> = ({
  id,
  brand,
  model,
  price,
  stock,
  description,
  dailyGeneration,
  image,
}) => {
  return (
    <div className="flex justify-center items-center m-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-72 bg-gradient-to-r from-yellow-100 via-orange-200 to-yellow-100">
        <div className="relative h-48">
          <Image
            className="object-cover w-full h-full"
            src={image}
            alt="Product Image"
            layout="fill"
          />
        </div>

        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-semibold text-gray-900">{brand}</h1>
            <span className="text-gray-600 text-sm">Stock: {stock}</span>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">{model}</h2>

          <p className="text-sm text-gray-700 mb-4">{description}</p>

          <div className="flex items-center mb-2">
            <span className="text-gray-900 font-semibold">$ {price}</span>
          </div>

          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-600">
              Daily Generation: {dailyGeneration}
            </span>
          </div>

          <Link href={`product_detail/${id}`}>
            <button className="bg-gradient-to-r from-yellow-300 to-orange-400 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105">
              Ver detalles
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
