'use client'
import React, { useEffect } from "react";
import { Product_Container } from "@/components/product_container";
import { HiHome } from "react-icons/hi";
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { ProductStore } from "@/store/productsStore";
import Title from "@/components/title";

const ProductsDB = () => {
  const getProducts = ProductStore((state) => state.setProducts);
  const products = ProductStore((state) => state.products);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
    getProducts();
    }
  }, [getProducts]);

  return (
    <div className="mb-36 bg-nose">
      <div className="my-10 text-center ">
        <Title />
      </div>
      <Breadcrumb aria-label="Default breadcrumb example" className="px-8 pb-6 text-lg ">
        <BreadcrumbItem icon={HiHome} href="/">Inicio</BreadcrumbItem>
        <BreadcrumbItem href="/products">Productos</BreadcrumbItem>
      </Breadcrumb>
      <Product_Container product={products} />
    </div>
  );
};
export default ProductsDB;
