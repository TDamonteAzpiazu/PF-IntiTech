'use client';
import React, { useEffect } from "react";
import { useSearchParams, useRouter} from "next/navigation";

const authSuccess = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    useEffect(() => {

        const token = searchParams.get('token');

        console.log(token)
        
        if (token) {
            localStorage.setItem("token", JSON.stringify({token}));
            
        }

        router.push('/');
    },[searchParams])
    

    return (
        <div className="h-screen mt-24">
            <h1>Auth Success</h1>
            <p>Code:</p>
        </div>
    )
}

export default authSuccess;