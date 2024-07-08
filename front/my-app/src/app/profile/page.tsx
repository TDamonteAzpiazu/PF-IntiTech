'use client';

import { DataUser } from "@/interfaces/interfaces";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const api_url = process.env.NEXT_PUBLIC_API_URL;

const Profile = () => {
    const [userData, setUserData] = useState<DataUser | null>(null);
    const [newUser, setNewUser] = useState<DataUser | null>(null);
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
            const res = await fetch(`${api_url}/files/uploadUserImage/${userData?.id}`, {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                const responseData = await res.json();
                localStorage.setItem('DataUser', JSON.stringify(responseData));
                setNewUser(responseData);
            } else {
                console.log('Error:', res.statusText);
            }
        } catch (error) {
            console.error("Un error ocurrió:", error);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedUserData: DataUser = JSON.parse(localStorage.getItem('DataUser')!);
            setNewUser(storedUserData);
        }
    }, []);

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

            // Verificar si el estado del usuario es pending y si el mensaje ya se mostró
            if (storedUserData?.status === 'pending' && !localStorage.getItem('accountActivationAlertShown')) {
                Swal.fire('Estado de la cuenta', 'Debes activar tu cuenta, revisa tu correo', 'info');
            }
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
            password: password || undefined,
        };
        try {
            const res = await fetch(`${api_url}/users/${userData?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (res.ok) {
                const updatedUser = await res.json();
                console.log(updatedUser);
                localStorage.setItem('DataUser', JSON.stringify(updatedUser));
                setUserData(updatedUser);

                setInputs({
                    name: updatedUser.name,
                    email: updatedUser.email,
                    address: updatedUser.address,
                    phone: updatedUser.phone,
                });
                setPassword('');
            } else {
                console.log('Error:', res.statusText);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="h-screen pt-28 flex justify-center gap-16 mb-10">
            <form className="flex flex-col" onSubmit={handleFileChange}>
                <h1 className="text-3xl text-white font-medium pt-4 px-4 pb-6">
                    Change profile image
                </h1>
                <div className="flex flex-col p-5">
                    <img src={newUser?.image} alt="imagen" className="flex mx-auto w-36 h-36 rounded-full" />
                    <label className="text-white text-lg pt-5">Change image:</label>
                    <input
                        onChange={handle_FileChange}
                        className="text-white  py-5"
                        type="file"
                    />
                </div>
                <button type="submit" className="mx-auto flex mt-14 w-fit h-fit px-4 py-3 rounded-xl bg-lightorangeinti text-white font-medium hover:scale-105 transition-all duration-300 ease-in-out">Guardar imagen</button>

            </form>
            <div className="border "></div>
            <form className="w-[700px]" onSubmit={handleSubmit}>
                <h1 className="text-3xl text-white font-medium p-3">Configuración de perfil</h1>
                <p className="text-white text-sm font-light px-3">Puedes cambiar tus datos personales</p>
                <div className="py-11">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-3">
                            <label className="text-white text-lg">Nombre :</label>
                            <input
                                name="name"
                                onChange={handleChange}
                                className="h-9 text-white bg-transparent border-b border-yellowinti p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                                placeholder={userData?.name || "Nombre"}
                                type="text"
                            />
                        </div>
                        <div className="p-3">
                            <label className="text-white text-lg">Correo :</label>
                            <input
                                name="email"
                                onChange={handleChange}
                                className="h-9 text-white bg-transparent border-b border-yellowinti p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                                placeholder={userData?.email || "Correo"}
                                type="text"
                            />
                        </div>
                        <div className="p-3">
                            <label className="text-white text-lg">Contraseña :</label>
                            <input
                                name="password"
                                onChange={handleChange}
                                className="h-9 text-white bg-transparent border-b border-yellowinti p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                                placeholder="Contraseña"
                                type="password"
                            />
                        </div>
                        <div className="p-3">
                            <label className="text-white text-lg">Dirección :</label>
                            <input
                                name="address"
                                onChange={handleChange}
                                className="h-9 text-white bg-transparent border-b border-yellowinti p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                                placeholder={userData?.address || "Dirección"}
                                type="text"
                            />
                        </div>
                        <div className="p-3">
                            <label className="text-white text-lg">Teléfono :</label>
                            <input
                                name="phone"
                                onChange={handleChange}
                                className="h-9 text-white bg-transparent border-b border-yellowinti p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                                placeholder={userData?.phone || "Teléfono"}
                                type="text"
                            />
                        </div>
                    </div>
                </div>
                <button type="submit" className="mx-auto flex mt-3 w-fit h-fit px-4 py-3 rounded-xl bg-lightorangeinti text-white font-medium hover:scale-105 transition-all duration-300 ease-in-out">Guardar cambios</button>
            </form>
        </div>
    );
};

export default Profile;
