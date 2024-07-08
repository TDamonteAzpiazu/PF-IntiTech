import { Ilogin_props, Iregister_props } from '@/interfaces/interfaces'
import Swal from "sweetalert2";

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
    console.log(res)
    if (res.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Registered successfully',
        showConfirmButton: false,
        timer: 2000
      })
      return res.json();
    } else {
      alert('Failed to register')
    }
  } catch (error: any) {
    throw new Error(error.message || 'se produjo un error durante el registro')
  }
}
