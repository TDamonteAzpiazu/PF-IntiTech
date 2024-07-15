import {create} from "zustand";
import { persist } from "zustand/middleware";

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

type Action = {
  setToken: (token: string) => void;
};

type State = {
  token: string;
};

export const UserStore = create(
  persist<State & Action>(
    (set) => ({
      token: "",
      setToken: (token: string) =>
        set((state) => ({
          token,
        })),
    }),
    {
      name: "user",
    }
  )
);
