'use client';
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const authSuccess = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {

        const token = searchParams.get('token');
        console.log(token)
        

        if (token) {
            localStorage.setItem("UserSession", JSON.stringify({ token }));
        }
        const decoded = jwtDecode(token!);
        const { id }: any = decoded;
        console.log(id)
        const dataUser = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/${id}`, {
                    method: 'GET',
                })
                const data = await response.json();
                localStorage.setItem('DataUser', JSON.stringify(data));
            } catch (error:any) {
                throw new Error(error);
            }
            
            
        }
        dataUser()
        router.push('/profile');
    }, [searchParams])
 
    
    
    return (
        <div className="h-screen mt-24">
            <h1>Auth Success</h1>
            <p>Code:</p>
        </div>
    )
}

export default authSuccess;