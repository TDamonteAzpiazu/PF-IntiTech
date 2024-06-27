import { Ilogin_props } from "@/interfaces/interfaces";
import { Iauth_response } from "@/interfaces/interfaces";

const api_url = process.env.NEXT_PUBLIC_API_URL;

export async function login_auth(
  data_user: Ilogin_props
): Promise<Iauth_response> {
  try {
<<<<<<< Updated upstream
    const response = await fetch(`${api_url}/users/login`, {
=======
    const res = await fetch(`${api_url}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data_user),
      
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to login");
    }

    const data = await res.json();

    console.log(data);
    document.cookie = `userToken=${data.token}`;//no borrar esta linea bruno culeado!!!!
    return data;
} catch (error: any) {
    throw new Error(error);
}
}


export async function register_auth(data_register: Iregister_props) {
  try {
    const res = await fetch(`${api_url}/auth/register`, {
>>>>>>> Stashed changes
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data_user),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "No se logro iniciar sesion");
    }
    const data: Iauth_response = await response.json();
    document.cookie = `userToken= ${data.token}`; 
    localStorage.setItem("userActive", JSON.stringify(data.user));
    return data;
  } catch (error: any) {
    throw new Error(
      error.message || "se produjo un error durante el incio de sesion"
    );
  }
}
