"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Lines_Chart } from "@/app/dashboard/grafica";
import { Circular_Chart } from "@/app/dashboard/pie";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import LinesChart from "@/components/chart_dynamic";
import Input from "@/components/input_dashboard";
const MySwal = withReactContent(Swal);

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState<any>([
        0, 0, 0, 0, 0, 0, 0
    ]);

    return (
        <div className="flex mt-20">
            
            <nav className="w-auto bg-slate-100 p-4 m-2 rounded-lg">
                <ul className="m-1 py-3 px-1 text-xl">
                    <li className="mb-4">
                        <Link href="/orders">Orders</Link>
                    </li>
                    <li className="mb-4">
                        <Link href="/products">Products</Link>
                    </li>
                    <li className="mb-4">
                        <Link href={"/messages"}>Messages</Link>
                    </li>
                    <li className="mb-4">
                        <Link href="/profile">Settings</Link>
                    </li>
                    <li className="mb-4">
                        <Link href={"/signout"}>Sign Out</Link>
                    </li>
                </ul>
            </nav>

            <main className="w-4/5 p-4 grid grid-cols-2 gap-2 h-auto">
                <section className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <Input stats={stats} setStats={setStats} />
                </section>
                <section className="bg-gray-100 p-1 rounded-lg shadow-md">

                    <Lines_Chart stats={stats} />
                </section>
                <section className="bg-gray-100 p-4 rounded-lg shadow-md h-60">

                    <Circular_Chart stats={stats} />

                </section>

                <LinesChart stats={stats} />


            </main>
        </div>
    );
};

export default Dashboard;






