import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Idata_google, auth_google, post_auth } from "@/helpers/auth.google";
import { jwtDecode } from "jwt-decode";

export interface Itoken {
  token: string;
  name: string;
  email: string;
}

{/*export const Button: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    const get_data_google = async () => {
      try {
        if (!router.isReady) return; // Verificar que el router esté listo
        const { token } = router.query;
        if (token) {
          const decode_token: Itoken = jwtDecode(token as string);
          const autentication_data: Idata_google = {
            email: decode_token.email,
            name: decode_token.name,
          };
          const data = await auth_google(autentication_data);
          setData(data);
        }
      } catch (error) {
        console.error("error en funcion get_data_google:", error);
      }
    };

    get_data_google(); // Llamar a la función dentro del useEffect

  }, [router.isReady, router.query]);

  const post_data_google = async () => {
    try {
      if (data) {
        await post_auth(data);
      }
    } catch (error) {
      console.error("error en funcion post_data_google:", error);
    }
  };

  return (
    <div>
      <button onClick={post_data_google}>BUTTON DE PRUEBA</button>
    </div>
  );
};

export default Button;*/}