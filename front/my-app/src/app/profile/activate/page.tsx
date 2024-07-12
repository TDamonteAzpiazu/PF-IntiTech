'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { DataStore } from "@/store/dataStore";

const Activate = () => {
    const { userDataUser, getDataUser } = DataStore();
    const router = useRouter();

    useEffect(() => {
        getDataUser();
    }, [getDataUser]);

    useEffect(() => {
            if (userDataUser) {
                if (userDataUser.status === 'active') {
                    Swal.fire('Este usuario ya fue activado');
                    router.push('/profile');
                }
        }
    }, [userDataUser]);
    console.log(userDataUser)

    const handleClick = async () => {
        if (!userDataUser) return;
        // getDataUser();

        const response = await fetch(`http://localhost:3000/users/${userDataUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: "active" }),
        });

        const res = await response.json();
        if (res) {
            getDataUser();
            Swal.fire('Cuenta activada', 'Ya puedes usar todas las funcionalidades', 'success');
            router.push('/products');
        }
    };

    return (
        <div className="bg-black h-screen flex justify-center items-center">
            <button 
                onClick={handleClick}
                className="h-fit text-white text-2xl font-medium py-3 px-6 border border-white rounded-xl hover:bg-yellowinti hover:text-black transition-all duration-500 ease-in-out"
            >
                Activa tu cuenta
            </button>
        </div>
    );
};

export default Activate;
