import { Icart, Iproducts_props } from "@/interfaces/interfaces";
import { create } from "zustand";

interface ProductsState {
    products: Iproducts_props[];
    productDetails: Iproducts_props | null;
    cartItems: Icart[];
    setProducts: () => Promise<void>;
    setProductDetails: (id: string) => Promise<void>;
    getItemsCart: (id: string) => Promise<void>;
}

export const ProductStore = create<ProductsState>((set) => ({
    products: [],
    productDetails: null,
    cartItems: [],
    setProducts: async () => {
        try {
            const res = await fetch(`https://pf-intitech.onrender.com/panelForSale`, {
                method: "GET",
                next: { revalidate: 0 },
            });
            const products: Iproducts_props[] = await res.json();
            set({
                products: products,
            })
            console.log(res)
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    },
    setProductDetails: async (id: string) => {
        try {
            const res = await fetch(`https://pf-intitech.onrender.com/panelForSale/${id}`, {
                method: "GET",
                next: { revalidate: 0 },
            });
            const product: Iproducts_props = await res.json();
            set({
                productDetails: product
            })
            console.log(product)
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    },
    getItemsCart: async (id: string) => {
        try {
            const res = await fetch(`https://pf-intitech.onrender.com/cart/getItems/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (res.ok) {
                const data = await res.json();
                set({
                    cartItems: data
                })
            }
        } catch (error) {
            console.error(error)
        }
    }
}))