import { Icart, Iproducts_props } from "@/interfaces/interfaces";
import { create } from "zustand";

interface ProductsState {
    products: Iproducts_props[];
    productDetails: Iproducts_props | null;
    cartItems: Icart[];
    currentPage: number;
    totalPages: number;
    setProducts: (page: number, limit: number) => Promise<void>;
    setProductDetails: (id: string) => Promise<void>;
    getItemsCart: (id: string) => Promise<void>;
    changePage: (page: number) => void;
}

export const ProductStore = create<ProductsState>((set) => ({
    products: [],
    productDetails: null,
    cartItems: [],
    currentPage: 1,
    totalPages: 10,
    setProducts: async (page: number, limit: number) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/panelForSale?page=${page}&limit=${limit}`, {
                method: "GET",
                next: { revalidate: 0 },
            });
            const data = await res.json();
            console.log(data);
            set({
                products: data,
                currentPage: page,
            });
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    },
    setProductDetails: async (id: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/panelForSale/${id}`, {
                method: "GET",
                next: { revalidate: 0 },
            });
            const product: Iproducts_props = await res.json();
            set({
                productDetails: product
            });
        } catch (error) {
            console.error('Error al obtener los detalles del producto:', error);
        }
    },
    getItemsCart: async (id: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/getItems/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (res.ok) {
                const data = await res.json();
                set({
                    cartItems: data
                });
            }
        } catch (error) {
            console.error('Error al obtener los items del carrito:', error);
        }
    },
    changePage: (page: number) => {
        set((state) => {
            state.setProducts(page, 5);
            return {
                currentPage: page
            };
        });
    }
}));