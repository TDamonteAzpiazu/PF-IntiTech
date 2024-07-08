'use client';
import React, { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export interface ID {
    id: number
}



const AuthSuccess = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const token = searchParams.get('token');
        console.log(token);

        if (token) {
            localStorage.setItem("UserSession", JSON.stringify({ token }));
            document.cookie = `userToken=${token}; path=/; secure; samesite=strict`;
            const decoded : ID = jwtDecode(token);
            const { id }: ID  = decoded;
            console.log(id);

            const dataUser = async () => {
                try {
                    const response = await fetch(`https://pf-intitech.onrender.com/users/${id}`, {
                        method: 'GET',
                    });
                    const data = await response.json();
                    localStorage.setItem('DataUser', JSON.stringify(data));
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                }
            };

            dataUser();
        }

        router.push('/profile');
    }, [searchParams, router]);

    return (
        <div className="h-screen mt-24 text-center text-black text-3xl">
            {/* <l-line-wobble
                size="80"
                stroke="5"
                bg-opacity="0.1"
                speed="1.75"
                color="black"
            ></l-line-wobble> */}
        </div>
    );
};

const SuspendedAuthSuccess = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <AuthSuccess />
    </Suspense>
);

export default SuspendedAuthSuccess;
