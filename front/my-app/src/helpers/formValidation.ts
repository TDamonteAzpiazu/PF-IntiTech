import { LoginErrorProps, Ilogin_props, RegisterErrorProps, Iregister_props } from "@/interfaces/interfaces";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?\d+$/;
const nameRegex = /^[a-zA-Z\s]*$/;
const addressRegex = /^[a-zA-Z0-9\s]*$/;

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
  } else if (!nameRegex.test(values.name)) {
    errors.name = "Name can only contain letters and spaces";
  } else if (!values.address) {
    errors.address = "Address is required";
  } else if (!addressRegex.test(values.address)) {
    errors.address = "Address can only contain letters, numbers, and spaces";
  } else if (!values.phone) {
    errors.phone = "Phone is required";
  } else if (!phoneRegex.test(values.phone)) {
    errors.phone = "Phone must contain only numbers and may start with '+'";
  }

  return errors;
}
