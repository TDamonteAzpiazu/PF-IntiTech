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
  user: {
    id: string;
    email: string;
  };
}
export interface Ilogin_props {
  email: string;
  password: string;
}

export interface LoginErrorProps {
  email?: string;
  password?: string;
}

export interface Iregister_props {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

export interface RegisterErrorProps {
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

export interface IAuthContext {
  token: string;
  setToken: (token: string) => void;
  logout: () => void;
  userData: Isession_active | null;
  setUserData: (userData: Isession_active) => void;

}

export interface IAuthProviderProps{
  children: React.ReactNode
}


//VERIFICAR SI AL USER SE LE AGREGA UNA PROPIEDAD PARA GUARDAR SUS ORDENES Y AGREGARLA EN ESTA INTERFACE.
export interface Isession_active {
  token: string;
  user: {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    image?: string;
  };
}

export interface DataUser {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  image?: string;
}

export interface Iproducts_props{
    id?: string,
    brand: string,
    model: string,
    price: 350,
    stock: 50,
    description: string,
    size?: string,
    dailyGeneration:string,
    image: string
}

