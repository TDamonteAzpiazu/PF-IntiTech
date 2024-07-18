'use client';
import React, { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { UserStore } from "@/store/userStore";

export interface ID {
  id: number
}

const AuthSuccess = () => {
    const { setToken } = UserStore((state) => state);
    const { token } = UserStore((state) => state);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        if(!token) return;
        const tokenData = searchParams.get('token');
        console.log(tokenData);

        if (tokenData) {
            setToken(tokenData);
            document.cookie = `userToken=${token}; path=/; secure; samesite=strict`;
            router.push('/profile')
        }
    }, [searchParams, router, token]);

    return (
        <div className="h-screen mt-24 text-center text-black text-3xl">
            Cargando...
        </div>
    )
}

const AuthSuccessWrapper = () => (
    <Suspense fallback={<div className="h-screen mt-24 text-center text-black text-3xl">Cargando...</div>}>
        <AuthSuccess />
    </Suspense>
);

export default AuthSuccessWrapper;
