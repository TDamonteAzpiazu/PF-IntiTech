import React from "react";
import Image from "next/image";
import BotonService from "../botonService";

const CardService = () => {
    return (
        <div className="pb-16">
            <h1 className="lg:text-4xl text-2xl font-bold pt-10 pb-32 lg:pl-12 lg:text-left text-center">Nuestros servicios</h1>
            <div className="flex justify-around items-center flex-wrap gap-32 lg:gap-0 ">
                <div className="w-80 border border-gray-300 h-[400px] bg-transparent rounded-2xl shadow-lg flex flex-col justify-center items-center p-5">
                    <Image src="/images/service1.webp" alt="Card Image" width={300} height={250} className="object-cover w-[300px] h-[250px] rounded-2xl transform translate-y-[-40%] border" />

                    <h1 className="text-black text-2xl mb-4 font-semibold">
                        DUSTERFLEX
                    </h1>
                    <p className="text-[rgb(70,65,66)] text-sm leading-relaxed text-center">
                        Agendamiento de limpieza para las fechas requeridas. Nuestro equipo opera los robots hasta completar la limpieza, garantizando calidad total.
                    </p>

                    <BotonService />

                </div>
                <div className="w-80 border border-gray-300 h-[400px] bg-transparent rounded-2xl shadow-lg flex flex-col justify-center items-center p-5">
                    <Image src="/images/service2.webp" alt="Card Image" width={300} height={250} className="object-cover w-[300px] h-[250px] rounded-2xl transform translate-y-[-40%] border" />
                    <h1 className="text-black text-2xl mb-4 font-semibold">
                        SMARTDUSTER
                    </h1>
                    <p className="text-[rgb(70,65,66)] text-sm leading-relaxed text-center">
                        Instalación permanente de un robot autónomo en cada fila de paneles, para una limpieza de alta frecuencia programada de forma remota.
                    </p>
                    <BotonService />
                </div>
                <div className="w-80 border border-gray-300 h-[400px] bg-transparent rounded-2xl shadow-lg flex flex-col justify-center items-center p-5">
                    <Image src="/images/service3.webp" alt="Card Image" width={300} height={250} className="object-cover w-[300px] h-[250px] rounded-2xl transform translate-y-[-40%] border" />
                    <h1 className="text-black text-2xl mb-4 font-semibold">
                        SUNSIGHT
                    </h1>
                    <p className="text-[rgb(70,65,66)] text-sm leading-relaxed text-center">
                        Obtiene una lectura correcta de la irradiación de la planta solar, mediante nuestro robot limpiador con conexión directa al SCADA.
                    </p>
                    <BotonService />
                </div>
            </div>
        </div>
    );
};

export default CardService;