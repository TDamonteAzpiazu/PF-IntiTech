'use client';

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { DataStore } from "@/store/dataStore";
import { useRouter } from "next/navigation";

const Profile = () => {
    const { userDataUser, getDataUser } = DataStore();
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
    });
    const [password, setPassword] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const router = useRouter();

    useEffect(() => {
        getDataUser();
    }, [getDataUser]);

    useEffect(() => {
        if (userDataUser) {
            setInputs({
                name: userDataUser.name || '',
                email: userDataUser.email || '',
                address: userDataUser.address || '',
                phone: userDataUser.phone || '',
            });


        }
    }, [userDataUser]);

    useEffect(() => {
        if (userDataUser.status === 'pending') {
            Swal.fire('Estado de la cuenta', 'Debes activar tu cuenta, revisa tu correo', 'info');
        }
    }, [])

    const handle_FileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setSelectedFile(file);
    };

    const handleFileChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        if (selectedFile) {
            formData.append('file', selectedFile);
        }
        try {
            const res = await fetch(`http://localhost:3000/files/uploadUserImage/${userDataUser.id}`, {
                method: 'POST',
                body: formData
            });

            if (res.ok) {
                getDataUser();
            } else {
                console.log('Error:', res.statusText);
            }
        } catch (error) {
            console.error("Un error ocurrió:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputs.name && !inputs.email && !inputs.address && !inputs.phone) {
            Swal.fire('Error', 'Por favor, completa todos los campos', 'error');
            return;
        }
        const updatedData: any = {};
        for (const key in inputs) {
            if (inputs[key as keyof typeof inputs]) {
                updatedData[key] = inputs[key as keyof typeof inputs];
            }
        }

        if (password) {
            updatedData.password = password;
        }
        try {
            const res = await fetch(`http://localhost:3000/users/${userDataUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (res.ok) {
                getDataUser();
                Swal.fire('Actualización exitosa', 'Tu perfil ha sido actualizado', 'success');
                setInputs({ name: '', email: '', address: '', phone: '' });
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
                    Cambiar foto de perfil
                </h1>
                <div className="flex flex-col p-5">
                    <img src={userDataUser?.image} alt="imagen" className="flex mx-auto w-36 h-36 rounded-full" />
                    <label className="text-white text-lg pt-5">Cambiar imagen:</label>
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
                                value={inputs.name}
                                onChange={handleChange}
                                className="h-9 text-white bg-transparent border-b border-yellowinti p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                                placeholder={userDataUser?.name || "Nombre"}
                                type="text"
                            />
                        </div>
                        <div className="p-3">
                            <label className="text-white text-lg">Correo :</label>
                            <input
                                name="email"
                                value={inputs.email}
                                onChange={handleChange}
                                className="h-9 text-white bg-transparent border-b border-yellowinti p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                                placeholder={userDataUser?.email || "Correo"}
                                type="text"
                            />
                        </div>
                        <div className="p-3">
                            <label className="text-white text-lg">Contraseña :</label>
                            <input
                                name="password"
                                onChange={handlePasswordChange}
                                className="h-9 text-white bg-transparent border-b border-yellowinti p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                                placeholder="Contraseña"
                                type="password"
                            />
                        </div>
                        <div className="p-3">
                            <label className="text-white text-lg">Dirección :</label>
                            <input
                                name="address"
                                value={inputs.address}
                                onChange={handleChange}
                                className="h-9 text-white bg-transparent border-b border-yellowinti p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                                placeholder={userDataUser?.address || "Dirección"}
                                type="text"
                            />
                        </div>
                        <div className="p-3">
                            <label className="text-white text-lg">Teléfono :</label>
                            <input
                                name="phone"
                                value={inputs.phone}
                                onChange={handleChange}
                                className="h-9 text-white bg-transparent border-b border-yellowinti p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                                placeholder={userDataUser?.phone || "Teléfono"}
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
