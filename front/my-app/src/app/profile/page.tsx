'use client';

import { DataUser } from "@/interfaces/interfaces";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Profile = () => {
    const [userData, setUserData] = useState<DataUser | null>(null);
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
    });
    const [password, setPassword] = useState('');

    const [selectedFile, setSelectedFile] = useState<File | null>(null);




    const handle_FileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setSelectedFile(file);
        console.log(file);
    };

    const handleFileChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        if (selectedFile) {
            formData.append('file', selectedFile);
        }
        try {
            const res = await fetch(`http://localhost:3000/files/uploadUserImage/${userData?.id}`, {
                method: 'POST',
                body: formData
            });

            if (!res.ok) {
                console.error("Error en la carga");

            }

            const responseData = await res.json();
            console.log(responseData);
        } catch (error) {
            console.error("Un error ocurrió:", error);
        }
    };


    



    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedUserData: DataUser = JSON.parse(localStorage.getItem('DataUser')!);
            setUserData(storedUserData);
            setInputs({
                name: storedUserData?.name || '',
                email: storedUserData?.email || '',
                address: storedUserData?.address || '',
                phone: storedUserData?.phone || '',
            });
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedData = {
            ...inputs,
            password: password || undefined, // Only include password if it has been changed
        };
        try {
            const res = await fetch(`http://localhost:3000/users/${userData?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            if (res.ok) {
                const updatedUser = await res.json();
                localStorage.setItem('DataUser', JSON.stringify(updatedUser));
                setUserData(updatedUser);
                setInputs({
                    name: updatedUser.name,
                    email: updatedUser.email,
                    address: updatedUser.address,
                    phone: updatedUser.phone,
                });
                setPassword(''); // Clear password field after successful update
            } else {
                console.log('Error:', res.statusText);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="pt-24 flex justify-center gap-12">
            <form className=" border" onSubmit={handleSubmit}>
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

                    </div>
                </div>
                <button type="submit" className="mx-auto flex my-10 w-fit h-fit px-4 py-3 rounded-xl bg-lightorangeinti text-white font-medium">Guardar cambios</button>
            </form>
            <form className="flex flex-col border w-96" onSubmit={handleFileChange}>
                <div>
                    <label className="text-white text-lg">Imagen actual:</label>
                    <img src={userData?.image} alt="imagen" className="w-32 h-32" />
                </div>

                <label className="text-white text-lg">Cambiar imagen:</label>
                <input
                    onChange={handle_FileChange}
                    className="h-9 p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none text-white"
                    type="file"
                />
                <button className="bg-lightorangeinti py-2 px-4 text-white font-medium rounded-xl" >Cargar imagen</button>
            </form>
        </div>
    );
};

export default Profile;
