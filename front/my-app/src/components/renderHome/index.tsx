import Link from "next/link";
import React from "react";

const RenderHome = () => {
    return (
        <div className="lg:h-screen -mt-20 bg-custom-image bg-size-400 bg-no-repeat lg:bg-size-200 text-white">
            <div className="flex lg:flex-row flex-col justify-center items-center h-full gap-12">
                <div className="lg:w-1/2 lg:mt-10 mt-24">
                    <h1 className="lg:text-5xl text-3xl font-medium mb-5 lg:pl-12 px-12 leading-snug">Desarrollo de tecnología robótica para plantas fotovoltaicas</h1>
                    <p className="lg:pl-12 px-12 lg:text-lg text-base lg:mb-20 mb-10">Servicios personalizados para soluciones energéticas eficientes y sostenibles.</p>
                    <Link href="/Hire"><button className=" w-48 transition-all duration-300 bg-yellowinti hover:bg-lightorangeinti text-black font-medium py-2 px-6 rounded-full ml-12" >Ver servicios</button></Link>

                </div>
                <div className="lg:w-1/2 lg:mt-10 flex flex-col text-end place-items-end">
                    <Link href="/products">
                        <button className="transition-all duration-300 bg-yellowinti hover:bg-lightorangeinti text-black font-medium py-2 px-6 rounded-full w-48 mr-12">Ver productos</button>
                    </Link>
                    <h1 className="lg:text-5xl text-3xl lg:mt-20 mt-10 lg:pr-12 px-12 text-right font-medium leading-snug">Descubre, nuestros paneles solares de calidad</h1>
                    <p className="lg:pr-12 px-12 lg:text-lg text-base text-right my-5 lg:mt-5 leading-relaxed">Explora nuestra selección de paneles solares eficientes. Encuentra la solución perfecta para tus necesidades de energía.</p>
                </div>
            </div>
        </div>
    );
};

export default RenderHome;