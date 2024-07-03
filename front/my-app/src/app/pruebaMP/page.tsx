'use client';
import React, { useEffect, useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

const YourComponent: React.FC = () => {
    const [preferenceId, setPreferenceId] = useState<string | null>(null);

    useEffect(() => {
        initMercadoPago('TEST-fa93dbfd-43ff-4ad0-b01f-9fbd39faeafc', { locale: 'es-AR' });
    }, []);

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
                            id: '1',
                            title: 'Product 1',
                            quantity: 6,
                            unit_price: 100,
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
        } catch (error:any) {
            console.error('Error handling click:', error.message);
        }
    };

    return (
        <div className="h-screen mt-24">
            <button onClick={handleClick}>Click</button>
            {preferenceId && <Wallet initialization={{ preferenceId }} />}
        </div>
    );
};

export default YourComponent;
