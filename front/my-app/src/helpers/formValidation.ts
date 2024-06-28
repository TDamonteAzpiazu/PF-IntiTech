import { LoginErrorProps, Ilogin_props } from "@/interfaces/interfaces";
import { RegisterErrorProps, Iregister_props } from "@/interfaces/interfaces";

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

export function validateRegisterForm(values: Iregister_props): RegisterErrorProps {
  let errors: RegisterErrorProps = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Invalid email address";
  } else if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  } else if (!values.name) {
    errors.name = "Name is required";
  } else if (!values.address) {
    errors.address = "Address is required";
  } else if (!values.phone) {
    errors.phone = "Phone is required";
  }
  return errors;
}
