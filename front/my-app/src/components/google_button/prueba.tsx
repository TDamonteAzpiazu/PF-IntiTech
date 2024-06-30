'use client'

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Idata_google, auth_google, post_auth } from "@/helpers/auth.google";
import Button from "./index"; 
import { jwtDecode } from "jwt-decode";

export interface Itoken {
  token: string | null;
  name: string;
  email: string;
}

const Google_Button: React.FC = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    const get_data_google = async () => {
      try {
        const token =  searchParams.get('token');
        console.log("Token:", token);

        if (token) {
          const decode_token: Itoken  = jwtDecode(token);
          console.log("Decoded Token:", decode_token); 
          const autentication_data: Idata_google = {
            email: decode_token.email,
            name: decode_token.name,
          };
          const data = await auth_google(autentication_data);
          console.log("Auth Data:", data);
          setData(data);
        }
      } catch (error) {
        console.error("Error en función get_data_google:", error);
      }
    };

    get_data_google();
  }, [searchParams]);

  const post_data_google = async () => {
    try {
      if (data) {
        console.log("log prueba Data:", data); 
        await post_auth(data);
        console.log("log de prueba Auth Data:", data); 
      }
    } catch (error) {
      console.error("Error en función post_data_google:", error);
    }
  };

  return (
    <div>
      <Button onClick={post_data_google} />
    </div>
  );
};

export default Google_Button;
