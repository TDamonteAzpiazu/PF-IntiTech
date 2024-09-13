'use client'
import React, { useEffect } from "react";
import { Product_Container } from "@/components/product_container";
import { HiHome } from "react-icons/hi";
import { Breadcrumb, BreadcrumbItem, Button } from "flowbite-react";
import { ProductStore } from "@/store/productsStore";
import Title from "@/components/title";

const ProductsDB = () => {
  const { setProducts, products, currentPage, totalPages, changePage } = ProductStore();
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setProducts(currentPage, 4);
    }
  }, [setProducts, currentPage]);

  return (
    <div className="mb-36 bg-nose">
      <div className="hidden lg:block lg:my-10 text-center ">
        <Title />
      </div>
      <Breadcrumb aria-label="Default breadcrumb example" className="pl-4 lg:px-8 pb-6 text-lg ">
        <BreadcrumbItem icon={HiHome} href="/">Inicio</BreadcrumbItem>
        <BreadcrumbItem href="/products">Productos</BreadcrumbItem>
      </Breadcrumb>
      <Product_Container product={products} />
      <div className="flex justify-center mt-8 space-x-4">
        <Button 
          onClick={() => changePage(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <span className="self-center">
          Página {currentPage} de {totalPages}
        </span>
        <Button 
          onClick={() => changePage(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
};

export default ProductsDB;