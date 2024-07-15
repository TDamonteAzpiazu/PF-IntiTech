import React from "react";
import { Product_Container } from "@/components/product_container";
import { get_product_DB } from "@/helpers/products.helper";
import { Iproducts_props } from "@/interfaces/interfaces";
import { HiHome } from "react-icons/hi";
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import Title from "@/components/title";

const products_db: React.FC = async () => {
  const products_db: Iproducts_props[] = await get_product_DB();
  return (
    <div className="mb-36 bg-nose">
      <div className="my-10 text-center ">
        <Title />
      </div>
      <Breadcrumb aria-label="Default breadcrumb example" className="px-8 pb-6 text-lg ">
        <BreadcrumbItem icon={HiHome} href="/">Inicio</BreadcrumbItem>
        <BreadcrumbItem href="/products">Productos</BreadcrumbItem>
      </Breadcrumb>
      <Product_Container product={products_db} />
    </div>
  );
};
export default products_db;
