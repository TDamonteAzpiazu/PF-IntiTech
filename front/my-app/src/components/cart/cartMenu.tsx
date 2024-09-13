import { Icart } from "@/interfaces/interfaces";
import { DataStore } from "@/store/dataStore";
import { ProductStore } from "@/store/productsStore";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";



type CartProps = {
    isOpen: boolean;
    toggleCart: () => void;
    items: Icart[];
    setItems: React.Dispatch<React.SetStateAction<Icart[]>>;
};

const Cart: React.FC<CartProps> = ({ isOpen, toggleCart, items, setItems }) => {
    
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const userData = DataStore((state) => state.userDataUser);
    const getDataUser = DataStore((state) => state.getDataUser);
    const getProducts = ProductStore((state) => state.setProducts);
    const products = ProductStore((state) => state.products);

    const cartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            getDataUser();
        }
    }, [getDataUser]);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    useEffect(() => {
        initMercadoPago("TEST-fa93dbfd-43ff-4ad0-b01f-9fbd39faeafc", { locale: "es-AR" });
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
                toggleCart();
                setPreferenceId(null);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, toggleCart]);

    const deleteItemFromCart = async (itemId: string) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/cart/${itemId}`);
            setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
        } catch (error) {
            console.error("Error deleting item from cart:", error);
            throw error;
        }
    };

    const deleteAllItemsFromCart = async () => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/cart/clearCart/${userData.cart?.id}`);
            setItems([]);
        } catch (error) {
            console.error("Error deleting all items from cart:", error);
            throw error;
        }
    };

    const subtractOneFromCartItem = async (itemId: string) => {
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/cart/substract/${itemId}`);
            const updatedItem = response.data;

            setItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === updatedItem.id
                        ? {
                            ...item,
                            quantity: updatedItem.quantity,
                            totalPrice: updatedItem.totalPrice,
                        }
                        : item,
                ),
            );
        } catch (error) {
            console.error("Error subtracting item from cart:", error);
            throw error;
        }
    };

    const addOneToCartItem = async (itemId: string) => {
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/cart/add/${itemId}`);
            const { cartItem, stock } = response.data;
            if (stock >= 0) {
                setItems((prevItems) =>
                    prevItems.map(item =>
                        item.id === itemId
                            ? {
                                ...item,
                                quantity: cartItem.quantity,
                                totalPrice: cartItem.totalPrice,
                                stock: stock
                            }
                            : item
                    )
                );
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
            throw error;
        }
    };


    const totalPrice = items.reduce((total, item) => total + item.totalPrice, 0);

    const createPreference = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mercadopago`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: items.map((item) => ({
                        id: item.id,
                        title: item.panel_model,
                        quantity: item.quantity,
                        unit_price: item.totalPrice / item.quantity,
                    })),
                }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            return data;
        } catch (error: any) {
            console.error("Error creating preference:", error.message);
            throw error;
        }
    };
    const handleClick = async () => {
        try {
            if (userData.status === "pending") {
                alert(
                    "Debes activar tu cuenta para ver el carrito de compras, revisa tu correo para activarla",
                );
                toggleCart();
                router.push("/profile");
                return;
            }
            setLoading(true);
            const preference = await createPreference();
            setPreferenceId(preference.preferenceId);
            setLoading(false);
        } catch (error: any) {
            console.error("Error handling click:", error.message);
            setLoading(false);
        }
    };

    return (
        <>
            <div
                ref={cartRef}
                className={`fixed top-0 right-0 h-full w-4/12 bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"} flex flex-col justify-between z-50`}>
                <div className="p-4 overflow-y-auto h-3/4">
                    <h2 className="text-2xl mb-4 text-black text-center">Carrito de compras</h2>
                    <div>
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between text-black items-center mb-2 border-b border-gray-400 pb-4 ">
                                <div className="flex items-center">
                                    <img
                                        className="w-12 h-12 mr-4"
                                        src={item.panel_image}
                                        alt={item.panel_model}
                                    />
                                    <div>
                                        <h3 className="text-lg font-bold">{item.panel_model}</h3>
                                        <p className="text-gray-500">${item.totalPrice}</p>
                                    </div>
                                </div>
                                <div className="flex items-right space-x-2">
                                    {item.quantity > 1 && (

                                        <button
                                            onClick={() => subtractOneFromCartItem(item.id)}
                                            title="Subtract One"
                                            className="group cursor-pointer outline-none hover:rotate-90 duration-300">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="25px"
                                                height="25px"
                                                viewBox="0 0 24 24"
                                                className="stroke-zinc-400 fill-none group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
                                            >
                                                <path
                                                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                                    stroke-width="1.5"
                                                ></path>
                                                <path d="M8 12H16" stroke-width="1.5"></path>
                                            </svg>
                                        </button>
                                    )}
                                    <span className="mx-2">{item.quantity === products.stock ? products.stock : item.quantity}</span>
                                    {
                                        item.stock !== 0 ? (
                                            <button
                                                onClick={() => addOneToCartItem(item.id)}
                                                title="Add One"
                                                className="group cursor-pointer outline-none hover:rotate-90 duration-300">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="25px"
                                                    height="25px"
                                                    viewBox="0 0 24 24"
                                                    className="stroke-zinc-400 fill-none group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300">
                                                    <path
                                                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                                        stroke-width="1.5"></path>
                                                    <path d="M12 8V16" stroke-width="1.5"></path>
                                                    <path d="M8 12H16" stroke-width="1.5"></path>
                                                </svg>
                                            </button>
                                        ) : null
                                    }

                                    <button
                                        className="-mr-2 pl-1 cursor-pointer"
                                        onClick={() => deleteItemFromCart(item.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#4e4d4d" className="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col justify-center p-4 space-y-4">
                    <div className="flex justify-between items-center mt-4 p-4 border-t">
                        <h2 className="text-xl font-bold text-black">Total:</h2>
                        <p className="text-xl font-bold text-black">${totalPrice.toFixed(2)}</p>
                    </div>
                    {
                        userData.cart ? (
                            <div className="flex flex-col space-y-4 items-center justify-center">
                                {items.length > 0 && (
                                    <>
                                        <button
                                            disabled={loading}
                                            onClick={handleClick}
                                            className="w-9/12 h-10 bg-yellowcustom bg-custom-radial bg-size-200 hover:bg-right text-white px-4 py-2 rounded-3xl transition-all duration-500 flex justify-center items-center">
                                            {loading ? (
                                                <div className="flex justify-center items-center">
                                                    Cargando...
                                                </div>
                                            ) : (
                                                "Comprar"
                                            )}
                                        </button>
                                        {preferenceId && <Wallet initialization={{ preferenceId }} />}
                                        <button
                                            onClick={deleteAllItemsFromCart}
                                            className="w-9/12 h-10 bg-white cursor-pointer rounded-3xl border-2 border-red-500 shadow-[inset_0px_-2px_0px_1px_red-500] group hover:bg-red-500 transition duration-300 ease-in-out"
                                        >
                                            <span className="font-medium text-[#000] group-hover:text-white">
                                                Limpiar carrito
                                            </span>
                                        </button>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="text-black">
                                <h1 className="text-center text-sm">Debes iniciar sesión para comprar</h1>
                            </div>
                        )
                    }
                </div>
            </div>
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40 ${isOpen ? "opacity-50 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={toggleCart} />
        </>
    );
};

export default Cart;
