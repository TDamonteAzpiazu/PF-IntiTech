import Image from 'next/image'
import React from 'react'

export default function CardPrueba() {
    return (
        <div className="m-0 h-screen flex justify-center items-center flex-row gap-5 bg-[rgb(59,50,42)] font-[Poppins,sans-serif] ">

            <div className="w-80 border h-[400px] bg-[rgb(29,28,28)] rounded-2xl shadow-lg flex flex-col justify-center items-center p-5">
                <Image src="/images/service1.webp" alt="Card Image" width={300} height={250} className="object-cover w-[300px] h-[250px] rounded-2xl transform translate-y-[-40%] border" />

                <h1 className="text-white text-2xl mb-4 font-semibold">
                DUSTERFLEX
                </h1>
                <p className="text-[rgb(177,172,172)] text-sm leading-relaxed text-center">
                Agendamiento de limpieza para las fechas requeridas. Nuestro equipo opera los robots hasta completar la limpieza, garantizando calidad total.
                </p>
                <button className="my-5 bg-transparent text-white py-2 px-6 rounded-full cursor-pointer border border-white text-base transition duration-300 ease-in-out hover:bg-white hover:text-[rgb(70,65,66)]">
                    Contratrar
                </button>

            </div>
            <div className="w-80 border h-[400px] bg-[rgb(29,28,28)] rounded-2xl shadow-lg flex flex-col justify-center items-center p-5">
                <Image src="/images/service2.webp" alt="Card Image" width={300} height={250} className="object-cover w-[300px] h-[250px] rounded-2xl transform translate-y-[-40%] border" />
                <h1 className="text-white text-2xl mb-4 font-semibold">
                    SMARTDUSTER
                </h1>
                <p className="text-[rgb(177,172,172)] text-sm leading-relaxed text-center">
                Instalación permanente de un robot autónomo en cada fila de paneles, para una limpieza de alta frecuencia programada de forma remota.
                </p>
                <button className="my-5 bg-transparent text-white py-2 px-6 rounded-full cursor-pointer border border-white text-base transition duration-300 ease-in-out hover:bg-white hover:text-[rgb(70,65,66)]">
                    Contratrar
                </button>
            </div>
            <div className="w-80 border h-[400px] bg-[rgb(29,28,28)] rounded-2xl shadow-lg flex flex-col justify-center items-center p-5">
                <Image src="/images/service3.webp" alt="Card Image" width={300} height={250} className="object-cover w-[300px] h-[250px] rounded-2xl transform translate-y-[-40%] border" />
                <h1 className="text-white text-2xl mb-4 font-semibold">
                    SUNSIGHT
                </h1>
                <p className="text-[rgb(177,172,172)] text-sm leading-relaxed text-center">
                Obtiene una lectura correcta de la irradiación de la planta solar, mediante nuestro robot limpiador de piranómetros con conexión directa al SCADA.
                </p>
                <button className="my-5 bg-transparent text-white py-2 px-6 rounded-full cursor-pointer border border-white text-base transition duration-300 ease-in-out hover:bg-white hover:text-[rgb(70,65,66)]">
                    Contratrar
                </button>
            </div>
        </div>

    )
}
