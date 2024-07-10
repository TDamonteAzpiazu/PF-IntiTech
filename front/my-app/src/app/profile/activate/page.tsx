'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    image?: string;
    status?: 'active' | 'inactive' | 'pending';
}

const Activate = () => {
    const [newUser, setNewUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedUserData: User = JSON.parse(localStorage.getItem('DataUser')!);
            if (storedUserData) {
                setNewUser(storedUserData);
                if (storedUserData.status === 'active') {
                    Swal.fire('Este usuario ya fue activado');
                    router.push('/profile');
                }
            }
        }
    }, [router]);

    const handleClick = async () => {
        if (!newUser) return;

        const response = await fetch(`http://localhost:3000/users/${newUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: "active" }),
        });

        const res = await response.json();
        if (res) {
            localStorage.setItem('DataUser', JSON.stringify(res));
            if (res.status === 'active') {
                alert('Usuario activado con éxito');
                router.push('/profile');
            }
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
