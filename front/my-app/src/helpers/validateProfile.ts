import { EditErrorProps } from "@/interfaces/interfaces";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?\d+$/;
const nameRegex = /^[a-zA-Z\s]*$/;
const addressRegex = /^[a-zA-Z0-9\s]*$/;

export const validateProfileForm = (values: EditErrorProps): EditErrorProps => {
    let errors: EditErrorProps = {};

    if (!values.name) {
        errors.name = "Inserte nombre";
    } else if (!nameRegex.test(values.name)) {
        errors.name = "El nombre solo puede contener letras y espacios";
    } else if (values.name.length > 40) {
        errors.name = "Nombre demasiado largo";
    }
    if (!values.address) {
        errors.address = "Inserte dirección";
    } else if (!addressRegex.test(values.address)) {
        errors.address = "La dirección solo puede contener letras, números y espacios";
    } else if (values.address.length > 150) {
        errors.address = "Dirección demasiado larga"; 
    }

    if (!values.phone) {
        errors.phone = "Inserte telefono";
    } else if (!phoneRegex.test(values.phone)) {
        errors.phone = "El telefono solo puede contener números";
    } else if (values.phone.length > 20) {
        errors.phone = "Telefono demasiado largo";
    }

    if (!values.email) {
        errors.email = "Inserte email";
    } else if (!emailRegex.test(values.email)) {
        errors.email = "Email invalido";
    } else if (values.email.length > 50) {
        errors.email = "Email demasiado largo";
    }
    return errors;
}
