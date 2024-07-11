import create from "zustand";
import { persist } from "zustand/middleware";
import {jwtDecode} from "jwt-decode";

interface Cart {
  id: string;
  totalPrice: number;
}

interface UserData {
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
  image?: string;
  status?: string;
  id?: string;
  token?: string;
  cart?: Cart;
}

interface UserState {
  userData: UserData;
  getDataUser: () => Promise<void>;
}

type Action = {
  setToken: (token: string) => void;
  register: (userData: UserData) => void;
  logout: () => void;
  token: string;
};

type State = {
  userData: UserData;
};

export const UserStore = create(
  persist<State & Action>(
    (set, get) => ({
      token: "",
      userData: {},
      setToken: (token: string) =>
        set((state) => ({
          token,
        })),
      register: async (userData: UserData) => {
        try {
          const { token } = get();
          const { id }: any = jwtDecode(token);
          const response = await fetch(`http://localhost:3000/users/${id}`, {
            method: "GET",
          });
          const res = await response.json();
          set((state) => ({
            userData: res,
          }));
        } catch (error) {
          console.log(error);
        }
      },
      logout: () => {
        set((state) => ({
          token: "",
          userData: {},
        }));
      },
    }),
    {
      name: "user",
    }
  )
);
