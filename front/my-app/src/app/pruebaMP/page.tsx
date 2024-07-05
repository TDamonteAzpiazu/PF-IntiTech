'use client';
import React, { useEffect, useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Icart } from '@/components/cartView';


export interface Data {
    cart: {
        id: string;
        totalPrice: number;
    }
}

const YourComponent: React.FC = () => {
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const [dataUser, setDataUser] = useState<any>(null);
    const [items, setItems] = useState<Icart[]>([]);


    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedUserData: Data = JSON.parse(localStorage.getItem('DataUser')!);
            const { cart } = storedUserData;
            setDataUser(cart);
        }
    }, []);

    useEffect(() => {
        initMercadoPago('TEST-fa93dbfd-43ff-4ad0-b01f-9fbd39faeafc', { locale: 'es-AR' });

        const getCart = async () => {
            try {
                const res = await fetch (`http://localhost:3000/cart/getItems/${dataUser?.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                const data = await res.json();
                setItems(data);
            } catch (error:any) {
                console.log(error);
            }
        }

       if (dataUser) {
            getCart();
        }
    }, [dataUser]);
    
    console.log(items);
    console.log(dataUser)
    
    const createPreference = async () => {
        try {
            const res = await fetch('http://localhost:3000/mercadopago', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: [
                        {
                            id: items[0].id,
                            title: items[0].panel_model,
                            quantity: items[0].quantity,
                            unit_price: items[0].totalPrice,
                        },
                    ],
                }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            return data;
        } catch (error: any) {
            console.error('Error creating preference:', error.message);
            throw error;
        }
    };

    const handleClick = async () => {
        try {
            const preference = await createPreference();
            setPreferenceId(preference.preferenceId);
        } catch (error: any) {
            console.error('Error handling click:', error.message);
        }
    };
    
    console.log(preferenceId)
    return (
        <div className="h-screen mt-24">
            <button onClick={handleClick}>Click</button>
            {preferenceId && <Wallet initialization={{ preferenceId }} />}
        </div>
    );
};

export default YourComponent;
