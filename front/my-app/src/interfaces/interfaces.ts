import { Role } from "@/enum/enum.role";

export interface Iuser_props {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  country: string;
  role: Role;
}

export interface Ioperating_panels {
  id: string;
  inverter: string;
  stats: Istats_props[];
}

export interface Ipanel_for_sale {
  id: string;
  brand: string;
  model: string;
  price: number;
  description: string;
  size: string;
  daily_generation: number;
  image: string;
}
export interface Istats_props {
  id: number;
  date: string;
  energy_generated: number;
  operating_panel: Ioperating_panels;
}
export interface Iinverter {
  id: number;
  name: string;
  operating_panels: Ioperating_panels[];
}
// MODIFICAR ACORDE ESCALE EL PROYECTO Y TENGAMOS MAS INFO
export interface Iauth_response {
  token: string;
  User: {
    id: string;
    email: string;
  };
}
export interface Ilogin_props {
  email: string;
  password: string;
}

export interface LoginErrorProps {
  email: string;
  password: string;
}

export interface Iregister_props {
  id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  country: string;
}

export interface registerErrorProps {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  address?: string;
  phone?: string;
  country?: string;
}
//CONTEXTO
export interface Icontext_provider {
  children: React.ReactElement;
}
export interface Icontext_props {
  user_data: Isession_active | null;
  setUser_data: (user_data: Isession_active | null) => void;
}
//VERIFICAR SI AL USER SE LE AGREGA UNA PROPIEDAD PARA GUARDAR SUS ORDENES Y AGREGARLA EN ESTA INTERFACE.
export interface Isession_active {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    country: string;
    role: Role;
  };
}
//FALTAN LAS INTERFACES DE USUARIO LOGUEADO, FORMULARIOS REGISTER, ORDENES CREADAS, CREDENCIALES. POR EL MOMENTO.
