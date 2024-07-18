'use client';
import React, { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { UserStore } from "@/store/userStore";

export interface ID {
  id: number
}

const AuthSuccess = () => {
    const tokenStore = UserStore((state) => state.token);
    const setToken = UserStore((state) => state.setToken);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (!tokenStore) return;

        const token = searchParams.get('token');
        console.log(token);

        if (token) {
            setToken(token);
            document.cookie = `userToken=${token}; path=/; secure; samesite=strict`;
            router.push('/profile')
        }
    }, [searchParams, router, tokenStore]);

    return (
        <div className="h-screen mt-24 text-center text-black text-3xl">
            Cargando...
        </div>
    )
}


export default AuthSuccess;
