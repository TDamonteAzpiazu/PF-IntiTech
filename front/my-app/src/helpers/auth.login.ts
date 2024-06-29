import { Ilogin_props, Iregister_props } from '@/interfaces/interfaces'
import { Iauth_response } from '@/interfaces/interfaces'

const api_url = process.env.NEXT_PUBLIC_API_URL

export async function login_auth(data_user: Ilogin_props) {
  try {
    const res = await fetch(`${api_url}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data_user),
    })
    if (res.ok) {
      return res.json()
    } else {
      alert('Failed to login')
      throw new Error('Failed to login')
    }
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function register_auth(data_register: Iregister_props) {
  try {
    const res = await fetch(`${api_url}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data_register),
    })
    if (res.ok) {
      return res.json()
    } else {
      alert('Failed to register')
      throw new Error('Failed to register')
    }
  } catch (error: any) {
    throw new Error(error.message || 'se produjo un error durante el registro')
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
