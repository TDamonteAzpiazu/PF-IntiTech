'use client';
import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { UserStore } from "@/store/userStore";

export interface ID {
  id: number
}

const AuthSuccess = () => {
    const { setToken } = UserStore((state) => state);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const token = searchParams.get('token');
        console.log(token);

        if (token) {
            setToken(token);
            document.cookie = `userToken=${token}; path=/; secure; samesite=strict`;
            router.push('/profile')
        }
    }, [searchParams, router, setToken]);

    return (
        <div className="h-screen mt-24 text-center text-black text-3xl">
            Cargando...
        </div>
    )
}


export default AuthSuccess;
