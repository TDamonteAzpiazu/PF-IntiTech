'use client';

import { DataUser } from "@/interfaces/interfaces";
import React, { useEffect, useState } from "react";

const Profile = () => {
    const [userData, setUserData] = useState<DataUser | null>(null);
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        phone: '',
    });

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedUserData: DataUser = JSON.parse(localStorage.getItem('DataUser')!);
            setUserData(storedUserData);
            setInputs({
                name: storedUserData?.name || '',
                email: storedUserData?.email || '',
                password: '',
                address: storedUserData?.address || '',
                phone: storedUserData?.phone || '',
            });
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const res = await fetch(`http://localhost:3000/users/${userData?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs),
            });
            if (res.ok) {
                const updatedUser = await res.json();
                localStorage.setItem('DataUser', JSON.stringify(updatedUser));
                setUserData(updatedUser);
                setInputs({
                    name: updatedUser.name,
                    email: updatedUser.email,
                    password: '',
                    address: updatedUser.address,
                    phone: updatedUser.phone,
                });
                window.location.reload();
            } else {
                console.log('Error:', res.statusText);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="pt-24">
            <form className="mx-10" onSubmit={handleSubmit}>
                <h1 className="text-3xl text-white font-medium py-3">Configuración de perfil</h1>
                <p className="text-white text-sm font-light pb-4">Puedes cambiar tus datos personales</p>
                <div className="flex justify-around py-11">
                    <div className="flex flex-col w-96">
                        <label className="text-white text-lg">Nombre:</label>
                        <input
                            name="name"
                            
                            onChange={handleChange}
                            className="h-9 text-white bg-transparent border-b border-yellowinti p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                            placeholder={userData?.name || "Nombre"}
                            type="text"
                        />
                        <label className="text-white text-lg">Correo:</label>
                        <input
                            name="email"
                           
                            onChange={handleChange}
                            className="h-9 text-white bg-transparent border-b border-yellowinti p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                            placeholder={userData?.email || "Correo"}
                            type="text"
                        />
                        <label className="text-white text-lg">Contraseña:</label>
                        <input
                            name="password"
                            
                            onChange={handleChange}
                            className="h-9 text-white bg-transparent border-b border-yellowinti p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                            placeholder="Contraseña"
                            type="password"
                        />
                    </div>
                    <div className="flex flex-col w-96">
                        <label className="text-white text-lg">Dirección:</label>
                        <input
                            name="address"
                            
                            onChange={handleChange}
                            className="h-9 text-white bg-transparent border-b border-yellowinti p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                            placeholder={userData?.address || "Dirección"}
                            type="text"
                        />
                        <label className="text-white text-lg">Teléfono:</label>
                        <input
                            name="phone"
                            
                            onChange={handleChange}
                            className="h-9 text-white bg-transparent border-b border-yellowinti p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                            placeholder={userData?.phone || "Teléfono"}
                            type="text"
                        />
                        <label className="text-white text-lg">Imagen:</label>
                        <input
                            className="h-9 p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none text-white"
                            type="file"
                        />
                    </div>
                </div>
                <button type="submit" className="mx-auto flex my-10 w-fit h-fit px-4 py-3 rounded-xl bg-lightorangeinti text-white font-medium">Guardar cambios</button>
            </form>
        </div>
    );
};

export default Profile;
