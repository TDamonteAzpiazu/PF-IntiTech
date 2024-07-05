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
    <div className="grid grid-cols-2 mt-2 transition-all hover:shadow-2xl rounded-lg justify-center gap-1 h-60 ">

        <div className="relative sm:h-70 sm:w-60 ">
          <Image
            className="rounded-l-md"
            src={image}
            alt="Product Image"
            layout="fill"/>
        </div>
      

        <div className="px-4 py-4 bg-gradient-to-r from-orange-400  to-orange-200 bg-transparent opacity-85 rounded-r-md ">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-semibold text-gray-900 ">{brand}</h1>
            <span className="text-gray-900  text-sm">Stock: {stock}</span>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-2">{model}</h2>


              <Link href={`product_detail/${id}`}>
            <button className="bg-gradient-to-r from-yellow-300 to-orange-400 opacity-95 hover:shadow-xl text-gray-900  px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105">
              Ver detalles
            </button>
          </Link>
        </div>
    </div>
    
  );
};

export default Product;
