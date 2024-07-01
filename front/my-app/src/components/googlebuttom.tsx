'use client';

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Context";


const GoogleButton = () => {
    const router = useRouter();
    const { setToken } = useAuth();

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data.token) {
                const { token } = event.data;
                localStorage.setItem("token", token);
                setToken(token);
                router.push("/");
            }
        }

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        }
    }, [setToken]);



    const handleLogin = () => {
        const url = "http://localhost:3000/auth/googleLogin";
        window.open(url, '_blank');
    }

    return (

        <button onClick={handleLogin}>
            Login with Google
        </button>

    );
};

export default GoogleButton;