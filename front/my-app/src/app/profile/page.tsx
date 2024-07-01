'use client';

import { DataUser } from "@/interfaces/interfaces";
import React, { useEffect, useState } from "react";


const profile = () => {
    const [userData, setUserData] = useState<DataUser>();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const userData: DataUser = JSON.parse(localStorage.getItem('DataUser')!)
            setUserData(userData)
        }
    }, [])



    return (
        <div className="h-screen pt-24">
            <form className="mx-10">
                <h1 className="text-3xl text-white font-medium py-3">Configuración de perfil</h1>
                <p className="text-white text-sm font-light pb-4">Puedes cambiar tus datos personales</p>
                <div className="flex justify-around py-11">
                    <div className="flex flex-col w-96">
                        <label className="text-white text-lg">Nombre:</label>
                        <input
                            className="h-9 bg-transparent border-b border-yellowinti p-2  mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                            placeholder={userData?.name}
                            type="text" />
                        <label className="text-white text-lg">Correo:</label>
                        <input
                            className="h-9 bg-transparent border-b border-yellowinti p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                            placeholder={userData?.email}
                            type="text" />
                        <label className="text-white text-lg">Contraseña:</label>
                        <input
                            className="h-9 bg-transparent border-b border-yellowinti p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                            placeholder="********"
                            type="text" />
                    </div>
                    <div className="flex flex-col w-96">
                        <label className="text-white text-lg">Dirección:</label>
                        <input
                            className="h-9 bg-transparent border-b border-yellowinti p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                            placeholder={userData?.address}
                            type="text" />
                        <label className="text-white text-lg">Teléfono:</label>
                        <input
                            className="h-9 bg-transparent border-b border-yellowinti p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                            placeholder={userData?.phone}
                            type="text" />
                        <label className="text-white text-lg">Imagen:</label>
                        <input
                            className="h-9 p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none text-white"
                            type="file" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default profile;