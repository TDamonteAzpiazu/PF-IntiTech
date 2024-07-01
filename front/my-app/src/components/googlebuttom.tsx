import React from "react";


const GoogleButton = () => {

    const handleLogin = () => {
        const url = "http://localhost:3000/auth/googleLogin";
        window.location.href = url; // Redirigir en la misma ventana
    };

    return (

        <button onClick={handleLogin}>
            <i className="fa-brands fa-google-plus-g"></i>
        </button>

    );
};

export default GoogleButton;