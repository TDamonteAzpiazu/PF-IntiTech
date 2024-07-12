import {create} from "zustand";
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
  userDataUser: UserData;
  getDataUser: () => Promise<void>;
}

export const DataStore = create<UserState>((set) => ({
  userDataUser: {},
  getDataUser: async () => {
    try {
      const store = localStorage.getItem('user');
      if (!store) {
        throw new Error("No user data found in localStorage");
      }

      const dataStore = JSON.parse(store);
      console.log(dataStore);

      const token = dataStore.state?.token;
      if (!token) {
        throw new Error("Token not found in user data");
      }

      const { id }: any = jwtDecode(token);
      console.log(id);

      const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      console.log(data);
      set({ userDataUser: data });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  },
}));
