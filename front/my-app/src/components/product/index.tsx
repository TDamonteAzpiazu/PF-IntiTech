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
    <div className="flex justify-center">
      <div className="flex mt-2 transition-all hover:scale-105 rounded-lg h-60 w-9/12">
        <div className="relative w-60 h-full">
          <Image
            className="rounded-l-md object-cover"
            src={image}
            alt="Product Image"
            layout="fill"
          />
        </div>
        <div className="flex-1 px-4 py-4 bg-gradient-to-r from-white to-gray-100 rounded-r-md">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-semibold text-gray-900">{brand}</h1>
            <span className="text-gray-900 text-sm">Stock: {stock}</span>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">{model}</h2>

          <Link href={`product_detail/${id}`}>
            <button className="bg-gradient-to-r from-yellow-300 to-orange-400 opacity-95 hover:shadow-xl text-gray-900 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105">
              Ver detalles
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;