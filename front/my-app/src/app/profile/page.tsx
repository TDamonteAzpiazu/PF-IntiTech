'use client'
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { DataStore } from "@/store/dataStore";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { validateProfileForm } from "@/helpers/validateProfile";
import { EditErrorProps } from "@/interfaces/interfaces";

const Profile = () => {
    const { userDataUser, getDataUser } = DataStore();
    const [error, setError] = useState<EditErrorProps>({
        name: '',
        email: '',
        address: '',
        phone: '',
        password: '',
        oldPassword: '',
    });
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
    });
    const [password, setPassword] = useState({
        password: '',
        oldPassword: '',
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = Cookies.get('userToken');
            if (!token) {
                router.push('/');
            } else {
                getDataUser();
            }
        }
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
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/files/uploadUserImage/${userDataUser.id}`, {
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
        const errors = validateProfileForm({ ...inputs, [name]: value });
        setError(errors);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPassword({ ...password, [name]: value });
        const errors = validateProfileForm({ ...password, [name]: value });
        setError(errors);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputs.name && !inputs.email && !inputs.address && !inputs.phone) {
            Swal.fire('Error', 'Por favor, completa los campos', 'error');
            return;
        }
        if ((password.password && !password.oldPassword) || (!password.password && password.oldPassword)) {
            Swal.fire('Error', 'Debes completar ambos campos de contraseña', 'error');
            return;
        }
        const updatedData: any = {};
        for (const key in inputs) {
            if (inputs[key as keyof typeof inputs]) {
                updatedData[key] = inputs[key as keyof typeof inputs];
            }
        }

        if (password.password !== '' && password.oldPassword !== '') {
            updatedData.password = password.password;
            updatedData.oldPassword = password.oldPassword;
        }
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userDataUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            console.log(res)
            if (res.ok) {
                getDataUser();
                Swal.fire('Actualización exitosa', 'Tu perfil ha sido actualizado', 'success');
                setInputs({ name: '', email: '', address: '', phone: '' });
                setPassword({ password: '', oldPassword: '' });
            } else {
                console.log("entra aqui");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleBan = async () => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro de borrar tu cuenta?',
                text: 'No podrás recuperarla',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, borrar',
                cancelButtonText: 'Cancelar',
            });

            if (result.isConfirmed) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/ban/${userDataUser.id}`, {
                    method: 'PUT',
                });

                if (res.ok) {
                    Cookies.remove('userToken');
                    localStorage.removeItem('user');
                    Swal.fire('Cuenta eliminada', 'Tu cuenta ha sido eliminada', 'success');
                    getDataUser();
                    window.location.reload();
                    router.push('/');
                } else {
                    console.error('Error al borrar la cuenta');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className="h-screen pt-16 flex justify-center gap-12 mb-10">
            <form className="flex flex-col bg-white rounded-xl shadow-lg" onSubmit={handleFileChange}>
                <h1 className="text-3xl text-black font-medium pt-4 px-4 pb-6">
                    Cambiar foto de perfil
                </h1>
                <div className="flex flex-col p-5">
                    <img src={userDataUser?.image} alt="imagen" className="flex mx-auto w-36 h-36 rounded-full" />
                    <label className="text-black text-lg pt-5">Cambiar imagen:</label>
                    <input
                        accept=".jpg,.jpeg,.png,.gif,.webp,.avif"
                        onChange={handle_FileChange}
                        className="text-black  py-5"
                        type="file"
                    />
                </div>
                <button type="submit" className="mx-auto flex mt-14 w-fit h-fit px-4 py-3 rounded-xl bg-lightorangeinti text-white font-medium hover:scale-105 transition-all duration-300 ease-in-out">Guardar imagen</button>
            </form>
            <div className="border border-black "></div>
            <form className="w-[750px] rounded-xl shadow-lg bg-white p-3" onSubmit={handleSubmit}>
                <h1 className="text-3xl text-black font-medium p-3">Configuración de perfil</h1>
                <p className="text-black text-sm font-light px-3">Puedes cambiar tus datos personales</p>
                <div className="py-11">
                    <div className="grid grid-cols-3 gap-4">

                        <div className="p-3">
                            <label className="text-black text-lg">Correo :</label>
                            <input
                                name="email"
                                value={inputs.email}
                                onChange={handleChange}
                                className="h-9 text-black bg-gray-200/40 border-b border-black  p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none rounded-t-lg"
                                placeholder={userDataUser?.email || "Correo"}
                                type="text"
                            />
                            <p className="text-red-500 font-medium text-sm text-center -mt-6">{error.email}</p>
                        </div>
                        <div className="p-3">
                            <label className="text-black text-lg">Contraseña actual:</label>
                            <input
                                name="oldPassword"
                                onChange={handlePasswordChange}
                                className="h-9 text-black bg-gray-200/40 border-b border-black rounded-t-lg p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                                placeholder="Contraseña"
                                type="password"
                            />
                            <p className="text-red-500 font-medium text-sm text-center -mt-6">{error.password}</p>
                        </div>
                        <div className="p-3">
                            <label className="text-black text-lg">Contraseña nueva:</label>
                            <input
                                name="password"
                                onChange={handlePasswordChange}
                                className="h-9 text-black bg-gray-200/40 border-b border-black rounded-t-lg p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                                placeholder="Contraseña"
                                type="password"
                            />
                            <p className="text-red-500 font-medium text-sm text-center -mt-6">{error.password}</p>
                        </div>
                        <div className="p-3">
                            <label className="text-black text-lg">Nombre :</label>
                            <input
                                name="name"
                                value={inputs.name}
                                onChange={handleChange}
                                className="h-9 text-black bg-gray-200/40 border-b rounded-t-lg border-black p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                                placeholder={userDataUser?.name || "Nombre"}
                                type="text"
                            />
                            <p className="text-red-500 font-medium text-sm text-center -mt-6">{error.name}</p>
                        </div>
                        <div className="p-3">
                            <label className="text-black text-lg">Dirección :</label>
                            <input
                                name="address"
                                value={inputs.address}
                                onChange={handleChange}
                                className="h-9 text-black bg-gray-200/40 border-b border-black rounded-t-lg p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                                placeholder={userDataUser?.address || "Dirección"}
                                type="text"
                            />
                            <p className="text-red-500 font-medium text-sm text-center -mt-6">{error.address}</p>
                        </div>
                        <div className="p-3">
                            <label className="text-black text-lg">Teléfono :</label>
                            <input
                                name="phone"
                                value={inputs.phone}
                                onChange={handleChange}
                                className="h-9 text-black bg-gray-200/40 border-b border-black rounded-t-lg p-2 mb-8 placeholder:p-2 placeholder:italic focus:outline-none"
                                placeholder={userDataUser?.phone || "Teléfono"}
                                type="text"
                            />
                            <p className="text-red-500 font-medium text-sm text-center -mt-6">{error.phone}</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-20 pt-10">
                    <button type="submit" className="px-4 py-3 rounded-xl bg-lightorangeinti text-white font-medium hover:scale-105 transition-all duration-300 ease-in-out">Guardar cambios</button>
                    <div
                        onClick={handleBan}
                        className="px-4 py-3 rounded-xl border-2 border-red-500 bg-transparent text-black font-medium hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">Cerrar mi cuenta</div>
                </div>
            </form>
        </div>
    )
}

export default Profile
