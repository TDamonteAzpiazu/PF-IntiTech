import React from "react";
import Image from "next/image";
import { Iproducts_props } from "@/interfaces/interfaces";
import Link from "next/link";
import BotonProducts from "../botonProducts";

const Product: React.FC<Iproducts_props> = ({id, brand,model, price, stock, image,}) => {
  return (
    <div key={id} className="w-60 h-[350px] shadow-lg bg-white border border-gray-200 flex flex-col justify-between items-center rounded-xl">
      <div>
        <Image src={image} alt="Product Image" width={500} height={500} className="w-60 h-40 p-3 rounded" />
      </div>
      <div>
        <p className="text-right px-3 text-sm text-gray-400">Stock {stock}</p>
        <h1 className="font-medium px-3 uppercase">{brand} - {model}</h1>
        <p className="font-medium text-lg text-right px-4">${price}</p>

      </div>
      <div className="mb-3">
        <Link href={`/product_detail/${id}`}><BotonProducts /></Link>
      </div>
     
    </div>
  );
};

export default Product;