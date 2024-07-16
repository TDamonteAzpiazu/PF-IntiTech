'use client';
import { useEffect } from 'react';
import { DataStore } from "@/store/dataStore";
import { ProductStore } from '@/store/productsStore';
import Title from '@/components/title';
import BotonProducts from '@/components/botonProducts';
import BotonService from '@/components/botonService';

const Page = () => {
  const userData = DataStore((state) => state.userDataUser);
  const getDataUser = DataStore((state) => state.getDataUser);
  const getProducts = ProductStore((state) => state.setProducts);
  const products = ProductStore((state) => state.products);
  const getItemsCart = ProductStore((state) => state.getItemsCart);
  const itemsCart =  ProductStore((state) => state.cartItems);


  useEffect(() => {
    getDataUser();
  }, [getDataUser]);

  useEffect(() => {
    getProducts();
  }, [products]);

  useEffect(() => {
    getItemsCart("761625ff-f358-45aa-8a69-9fa95bf6c123");
  }, [getItemsCart]);

  return (
    <div className='mt-32 text-center'>
      <Title />
      <BotonProducts title="Products" />
      <BotonService />
    </div>
  );
};

export default Page;
