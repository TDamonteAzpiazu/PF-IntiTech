import React from "react";
import Link from "next/link";
import Image from "next/image";

const CardService = () => {
    return (
        <div className="bg-nose pb-16">
            <h1 className="text-3xl pt-10 pb-16 pl-12 ">Nuestros servicios</h1>
            <div className="flex justify-around items-center">
                <div className="w-80 h-[450px] rounded-xl text-center shadow-custom hover:scale-105 transition-all duration-300 ease-out-in">
                    <div>
                        <Image className="rounded-t-xl" src="/images/service1.webp" alt="DUSTERFLEX.SERVICE" width={320} height={100} />
                    </div>
                    <div>
                        <h1 className="font-semibold text-xl py-3">DUSTERFLEX</h1>
                        <p className="pb-5 px-5 text-sm">Agendamiento de limpieza para las fechas requeridas. Nuestro equipo opera los robots hasta completar la limpieza.</p>
                        <Link href="/Hire">
                            <button className="border py-2 px-9 rounded-xl mt-10 bg-yellowcustom bg-custom-radial bg-size-200 hover:bg-right transition-all duration-500">
                                Contratar
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="w-80 h-[450px] rounded-xl text-center shadow-custom hover:scale-105 transition-all duration-300 ease-out-in">
                    <div>
                        <Image className="rounded-t-xl" src="/images/service2.webp" alt="" width={320} height={10} />
                    </div>
                    <div>
                        <h1 className="font-semibold text-xl py-3">SMARTDUSTER</h1>
                        <p className="pb-5 px-5 text-sm">Instalación permanente de un robot autónomo en cada fila de paneles, para una limpieza de alta frecuencia programada de forma remota.</p>
                        <Link href="/Hire">
                            <button className="border py-2 px-9 rounded-xl mt-10 bg-yellowcustom bg-custom-radial bg-size-200 hover:bg-right transition-all duration-500">
                                Contratar
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="w-80 h-[450px] rounded-xl text-center shadow-custom hover:scale-105 transition-all duration-300 ease-out-in">
                    <div>
                        <Image className="rounded-t-xl object-contain" src="/images/service3.webp" alt="" width={320} height={100} />
                    </div>
                    <div>
                        <h1 className="font-semibold text-xl py-3">SUNSIGHT</h1>
                        <p className="pb-5 px-5 text-sm">Obtiene una lectura correcta de la irradiación de la planta solar, mediante nuestro robot limpiador de piranómetros con conexión directa al SCADA (Supervisory Control and Data Acquisition) .</p>
                        <Link href="/Hire">
                            <button className="border py-2 px-9 rounded-xl bg-yellowcustom bg-custom-radial bg-size-200 hover:bg-right transition-all duration-500 ">
                                Contratar
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardService;