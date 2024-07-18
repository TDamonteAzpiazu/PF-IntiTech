'use client';
import React, { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { UserStore } from "@/store/userStore";

export interface ID {
  id: number
}

const AuthSuccess = () => {
    const store = UserStore ? UserStore((state) => state) : null;
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (!store) return;

        const token = searchParams.get('token');
        console.log(token);

        if (token) {
            store.setToken(token);
            document.cookie = `userToken=${token}; path=/; secure; samesite=strict`;

            router.push('/profile')
        }
    }, [searchParams, router, store]);

    return (
        <div className="h-screen mt-24 text-center text-black text-3xl">
            Cargando...
        </div>
    )
}

const SuspendedAuthSuccess = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <AuthSuccess />
    </Suspense>
)

export default SuspendedAuthSuccess;
