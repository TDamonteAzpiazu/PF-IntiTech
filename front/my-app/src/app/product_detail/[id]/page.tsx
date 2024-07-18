'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { DataStore } from "@/store/dataStore";
import { ProductStore } from '@/store/productsStore'
import { HiHome, HiOutlineHeart } from "react-icons/hi";
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import Swal from 'sweetalert2'
import Accordion from '@/components/accordion'
import BotonCart from '@/components/botonCart'


interface Idetail_props {
  params: {
    id: string
  }
}

const Product_detail: React.FC<Idetail_props> = ({ params }) => {
  const router = useRouter();
  const userData = DataStore((state) => state.userDataUser);
  const getDataUser = DataStore((state) => state.getDataUser);
  const setProductDetails = ProductStore((state) => state.setProductDetails);
  const data_product = ProductStore((state) => state.productDetails);

  useEffect(() => {
    if (typeof window !== 'undefined') {
    getDataUser();
    }
  }, [getDataUser]);

  useEffect(() => {
    setProductDetails(params.id);

  }, [params.id, setProductDetails]);

  const handleAddToCart = async () => {
    if (userData.status === "pending") {
      alert("Debes activar tu cuenta para agregar items al carrito");
      router.push("/profile");
      return;
    }

    if (!data_product?.id) {
      alert("Debes iniciar sesion para agregar items al carrito");
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(`https://pf-intitech.onrender.com/cart/add/${userData.cart?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          panel_id: data_product?.id,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        alert('Debes iniciar sesión para agregar items al carrito')
        return
      }
      if (response.ok) {
        Swal.fire({
          position: 'top-end',
          toast: true,
          icon: 'success',
          title: 'Item agregado al carrito',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  if (!data_product) {
    return (
      <div className="h-screen mt-44 text-center bg-custom-image bg-no-repeat bg-size-200">
        Cargando...
      </div>
    )
  }

  return (
    <div className='flex flex-col px-24 pb-20'>
      <Breadcrumb className="-ml-20 pt-12 text-lg text-black" >
        <BreadcrumbItem icon={HiHome} href="/" className='text-black'>Inicio</BreadcrumbItem>
        <BreadcrumbItem href="/products">Productos</BreadcrumbItem>
        <BreadcrumbItem>{data_product.model}</BreadcrumbItem>
      </Breadcrumb>
      <div className="flex items-center justify-center mt-8 rounded-lg bg-white">
        <div className="relative w-96 h-96 mr-8">
          <Image
            className="rounded-l-md"
            src={data_product.image}
            alt="Product Image"
            layout="fill"
          />
        </div>
        <div className="flex flex-col gap-4 justify-center w-[60%] h-96  ">
          <div>
            <div className='flex justify-between'>
              <p className="text-3xl font-medium uppercase mb-8">{data_product.brand}</p>
              <p className="text-base font-light text-gray-500 uppercase mb-8">Stock: {data_product.stock}</p>
            </div>
            <h1 className="text-xl uppercase mb-6">{data_product.model}</h1>
            <p className="text-3xl mb-6 font-medium ">$ {data_product.price}</p>
            <div className='flex justify-start gap-12'>
              <BotonCart addTocart={handleAddToCart} />
              <button className="text-3xl py-2 px-4 rounded-lg">
                <HiOutlineHeart className='hover:fill-red-600 hover:text-red-600 ' strokeWidth={1.2} />
              </button>
            </div>
          </div>
          <div className='h-24'>
            <Accordion title="Descripción" answer={data_product.description} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Product_detail
