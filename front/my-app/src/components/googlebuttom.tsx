import React from "react";


const GoogleButton = () => {

    const handleLogin = () => {
        const url = "http://localhost:3000/auth/googleLogin";
        window.location.href = url; // Redirigir en la misma ventana
    };

    return (

        <button onClick={handleLogin}>
            Iniciar con Google
        </button>

    );
};

export default GoogleButton;