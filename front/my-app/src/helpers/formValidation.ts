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
  }else if (values.email.length > 50) {
    errors.email = "Email demasiado largo";
  }

  if (!values.password) {
    errors.password = "Inserte contraseña";
  }else if (values.password.length > 50) {
    errors.password = "Contraseña demasiado larga";
  }

  return errors;
}

export function validateRegisterForm(values: Iregister_props): RegisterErrorProps {
  let errors: RegisterErrorProps = {};

  if (!values.email) {
    errors.email = "Email es requerido";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "Email inválido";
  } else if (values.email.length > 50) {
    errors.email = "Email demasiado largo";
  }
  
  if (!values.password) {
    errors.password = "Contraseña es requerida";
  } else if (values.password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  } else if (values.password.length > 50) {
    errors.password = "Contraseña demasiado larga";
  }
  
  if (!values.name) {
    errors.name = "Nombre es requerido";
  } else if (!nameRegex.test(values.name)) {
    errors.name = "El nombre solo puede contener letras y espacios";
  } else if (values.name.length > 40) {
    errors.name = "Nombre demasiado largo";
  }
  
  if (!values.address) {
    errors.address = "Dirección es requerida";
  } else if (!addressRegex.test(values.address)) {
    errors.address = "La dirección solo puede contener letras, números y espacios";
  } else if (values.address.length > 150) {
    errors.address = "Dirección demasiado larga";
  }
  
  if (!values.phone) {
    errors.phone = "Teléfono es requerido";
  } else if (!phoneRegex.test(values.phone)) {
    errors.phone = "El teléfono solo debe contener números y puede comenzar con '+'";
  } else if (values.phone.length > 15) {
    errors.phone = "Teléfono demasiado largo";
  }

  return errors;
}
