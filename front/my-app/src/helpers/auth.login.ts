import { Ilogin_props } from "@/interfaces/interfaces";
import { Iauth_response } from "@/interfaces/interfaces";

const api_url = process.env.NEXT_PUBLIC_API_URL;

export async function login_auth(
  data_user: Ilogin_props
): Promise<Iauth_response> {
  try {
    const response = await fetch(`${api_url}/users/login`, {
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
/*a esta funcion mas adelante hay que verificar si le pega a la ruta que quede en el back para el login, por si acaso utilizamos un middleware de control de rutas, agregue el envio de cookies junto al local storage.

El control de errores lo modificamos a medida tengamos las funciones de servicio y controladores.

Por el momento con esto se podria empezar a probar junto al mock, en las envs, coloque la url de una api mocha esta funcionando en thunderclient a esta ruta https://apimocha.com/pruebafront/users/login tenes que poner el metodo POST y colocar esto en el cuerpo del body 
{
  "email": "lucas@mail.com",
  "password": "1234"
}
si esta todo ok te devuelve unos datos de usuario
*/