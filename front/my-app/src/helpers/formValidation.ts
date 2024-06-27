import { LoginErrorProps, Ilogin_props } from "@/interfaces/interfaces";
import { registerErrorProps, Iregister_props } from "@/interfaces/interfaces";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLoginForm(values: Ilogin_props): LoginErrorProps {
    let errors: LoginErrorProps = {};
  
    if (!values.email) {
      errors.email = "Inserte email valido";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Email invalido";
    }
  
    if (!values.password) {
      errors.password = "Inserte contraseña";
    }
  
    return errors;
  }

export function validateRegisterForm(values: Iregister_props): registerErrorProps {
    let errors: registerErrorProps = {};

    if (!values.email) {
        errors.email = "Inserte email valido";
    } else if (!emailRegex.test(values.email)) {
        errors.email = "Email invalido";
    }

    if (!values.password) {
        errors.password = "Inserte contraseña";
    }

    if (!values.name) {
        errors.name = "Inserte nombre";
    }

    if (!values.address) {
        errors.address = "Inserte dirección";
    }

    if (!values.phone) {
        errors.phone = "Inserte número de teléfono";
    }

    return errors;
}
