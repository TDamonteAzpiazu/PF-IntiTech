'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export interface Cart {
  id: number;
  totalPrice: number;
}

export interface UserData {
  cart: Cart;
}
export const api_url = process.env.NEXT_PUBLIC_API_URL;


const PayOk = () => {
  const router = useRouter();
  const [dataUser, setDataUser] = useState<Cart | null>(null);
  
  useEffect(() => {
    const storage = localStorage.getItem('DataUser');
    if (storage) {
      const parsedData: UserData = JSON.parse(storage);
      setDataUser(parsedData.cart);
    }
  }, []);

  console.log(dataUser);

  const handleOnClick = async () => {
      try {
        await axios.post(`${api_url}/cart/createRecord/${dataUser?.id}`)
        console.log('ok');
        router.push('/orders');
      } catch (error) {
        console.log(error);
      }

  };

  console.log(handleOnClick);

  return (
    <div className="bg-gradient-to-tl from-green-400 to-green-500 text-white h-screen flex flex-col items-center justify-center relative">
      <div className="flex items-center mb-8">
        <div className="loader border-r-2 rounded-full border-grey-300 bg-white animate-bounce aspect-square w-12 flex justify-center items-center text-green-500 mr-8 text-3xl font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.18em" height="1em" viewBox="0 0 1179 1000">
            <path fill="currentColor" d="M1179 72Q929 294 579 822l-115 179Q320 821 0 501l107-107l286 250q150-150 279-271.5T877.5 185T1009 74t77-59l21-14q4 0 11 2t26 19.5t35 49.5"/>
          </svg>
        </div>
        <div className='text-6xl'>Pago aceptado</div>
      </div>
      <button 
        onClick={handleOnClick} 
        type="button" 
        className="bg-white text-center w-80 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group"
        
      >
        <div className="bg-green-400 rounded-xl h-12 w-14 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[312px] z-10 duration-500">
          <svg width="25px" height="25px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path fill="#000000" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"/>
            <path fill="#000000" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"/>
          </svg>
        </div>
        <p className="translate-x-2">Continue shopping</p>
      </button>
     
    </div>
  );
};

export default PayOk;
