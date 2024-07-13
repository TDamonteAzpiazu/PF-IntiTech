'use client';
import { useEffect } from 'react';
import { DataStore } from "@/store/dataStore";
import { ProductStore } from '@/store/productsStore';

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

  // console.log(userData);

  return (
    <div className='mt-32 text-center'>
      {/* {

        userData ? <div> 
          <h1 className='text-3xl'>Hola {JSON.stringify(userData)}</h1>
          </div>
           : <h1 className='text-3xl'>Hola Invitado</h1>


      }
      <hr />
      {
        products && <h1 className='text-3xl'>Hola {JSON.stringify(products)}</h1>
      }
      <hr /> */}
      <div>
        {
          itemsCart && itemsCart.map((item) => (
            <div key={item.id}>
              <h1>{JSON.stringify(item)}</h1>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Page;
