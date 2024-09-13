import { Ilogin_props, Iregister_props } from "@/interfaces/interfaces";
import Swal from "sweetalert2";


export async function login_auth(data_user: Ilogin_props) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data_user),
    });
    if (res.ok) {
      return res.json();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salio mal",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "black",
      });
    }
  } catch (error) {
    console.log(error)
  }
}

export async function register_auth(data_register: Iregister_props) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data_register),
    });
    if (res.ok) {
      Swal.fire({
        icon: "success",
        title: "Registered successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      return res.json();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salio mal",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
        confirmButtonColor: "black",
      })
    }
  } catch (error: any) {
    throw new Error(error.message || "se produjo un error durante el registro");
  }
}
