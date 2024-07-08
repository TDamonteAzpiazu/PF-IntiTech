import Link from "next/link";
import React from "react";

const RenderHome = () => {
    return (
        <div className="h-screen bg-custom-image bg-no-repeat bg-size-200 text-white">
            <div className="flex justify-center items-center h-full gap-12">
                <div className="w-1/2 mt-10">
                    <h1 className="text-5xl font-medium mb-5 pl-12 leading-snug">Desarrollo de tecnología robótica para plantas fotovoltaicas</h1>
                    <p className="pl-12 text-lg mb-20">Servicios personalizados para soluciones energéticas eficientes y sostenibles.</p>
                    <Link href="/Hire"><button className=" w-48 transition-all duration-300 bg-yellowinti hover:bg-lightorangeinti text-black font-medium py-2 px-6 rounded-full ml-12" >Ver servicios</button></Link>

                </div>
                <div className="w-1/2 mt-10 flex flex-col text-end place-items-end">
                    <Link href="/products">
                        <button className="transition-all duration-300 bg-yellowinti hover:bg-lightorangeinti text-black font-medium py-2 px-6 rounded-full w-48 mr-12">Ver productos</button>
                    </Link>
                    <h1 className="text-5xl mt-20 pr-12 font-medium leading-snug">Descubre, nuestros paneles solares de calidad</h1>
                    <p className="pr-12 text-lg mt-5">Explora nuestra selección de paneles solares eficientes. Encuentra la solución perfecta para tus necesidades de energía.</p>
                </div>
            </div>
        </div>
    );
};

export default RenderHome;