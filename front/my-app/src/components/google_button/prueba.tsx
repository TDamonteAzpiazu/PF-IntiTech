// components/GoogleLoginButton.tsx
import React from 'react';

const GoogleLoginButton = () => {
  const handleLogin = () => {
    // Redirige a la ruta de Google Login en el backend
    window.location.href = 'http://localhost:3000/auth/googleLogin';
  };

  return (
    <button onClick={handleLogin}>
      Login with Google
    </button>
  );
};

export default GoogleLoginButton;
