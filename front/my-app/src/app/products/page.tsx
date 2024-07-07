import React from "react";
import { Product_Container } from "@/components/product_container";
import { get_product_DB } from "@/helpers/products.helper";
import { Iproducts_props } from "@/interfaces/interfaces";

const products_db: React.FC = async () => {
  const products_db: Iproducts_props[] = await get_product_DB();
  return (
    <div className="mt-40 mb-36">
      <div className="text-white text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-4xl font-bold py-5 px-10">
        Haz clic para ver sus detalles y encontrar la opción perfecta. ¡Transforma tu hogar o negocio con energía solar hoy mismo!
        </h1>
      </div>
      <Product_Container product={products_db} />
    </div>
  );
};
export default products_db;
