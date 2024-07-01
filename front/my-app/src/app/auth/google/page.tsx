'use client';
import React, { useEffect } from "react";
import { useSearchParams} from "next/navigation";

const authSuccess = () => {
    const searchParams = useSearchParams();
    
    useEffect(() => {

        const token = searchParams.get('token');

        console.log(token)
        
        if (token) {
            localStorage.setItem("token", token);
            window.opener.postMessage({ token }, "*");
            window.close();
        }
    },[searchParams])
  

    return (
        <div className="h-full">
            <h1>Auth Success</h1>
            <p>Code:</p>
        </div>
    )
}

export default authSuccess;