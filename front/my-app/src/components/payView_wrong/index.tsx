import React from 'react';

const PayWrong = () => {
  return (
    <div className="bg-gradient-to-tl from-red-400 to-red-500 text-white h-screen flex flex-col items-center justify-center relative">
      <div className="flex items-center mb-8">
        <div className="loader border-r-2 rounded-full border-grey-300 bg-white animate-bounce aspect-square w-12 flex justify-center items-center text-red-500 mr-8 text-3xl font-bold">X</div>
        <div className='text-6xl'>Pago rechazado</div>
      </div>
        <button type="button"className="bg-white text-center w-80 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group">
        <div className="bg-red-400 rounded-xl h-12 w-14 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[312px] z-10 duration-500">
        <svg
        width="25px"
        height="25px"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        >
        <path
            fill="#000000"
            d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
        ></path>
        <path
            fill="#000000"
            d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
        ></path>
        </svg>
        </div>
        <p className="translate-x-2">Back to shopping</p>
        </button>
    </div>
  );
};

export default PayWrong;