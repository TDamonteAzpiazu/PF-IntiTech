// MODIFICAR ACORDE ESCALE EL PROYECTO Y TENGAMOS MAS INFO

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
  id: string;
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

