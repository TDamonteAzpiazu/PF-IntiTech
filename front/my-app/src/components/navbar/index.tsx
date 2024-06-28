'use client';
import { Isession_active } from "@/interfaces/interfaces";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {

    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState<Isession_active>();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const userData: Isession_active = JSON.parse(localStorage.getItem('UserSession')!)
            setUserData(userData)
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('UserSession');
        window.location.reload();
    }
    const handleClick = () => {
        setOpen(!open);
    }

    return (
        <div className="h-20 border border-black">
            {
                userData ? (
                    <div className="">
                        <div className="h-full w-24 ">
                            <img className="h-full" src="https://pbs.twimg.com/media/GRG86T6W0AA6TyU?format=png&name=medium" alt="" />
                        </div>
                        <nav>
                            <ul>
                                <li>
                                    <Link href="/">Home</Link>
                                    <Link href="/">Products</Link>
                                    <Link href="/">About us</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                ) : (
                    <div className="flex items-center justify-between h-full">
                        <div className="h-full w-24 ml-8">
                            <img className="h-full" src="https://pbs.twimg.com/media/GRG86T6W0AA6TyU?format=png&name=medium" alt="" />
                        </div>
                        <nav className="h-full">
                            <ul className="flex items-center w-full h-full border border-green-500">
                                <li>
                                    <Link href="/">Home</Link>
                                    <Link href="/">Products</Link>
                                    <Link href="/">About us</Link>
                                </li>
                            </ul>
                        </nav>
                        <div className="mx-5">
                            <button onClick={handleClick} className="bg-lightorangeinti text-white mr-4 px-4 py-2 rounded-lg">
                                <Link href="/login">Login</Link></button>
                            <button onClick={handleClick} className="bg-lightorangeinti text-white  px-4 py-2 rounded-lg">
                                <Link href="/login">Register </Link></button>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default Navbar;
// https://cdn-icons-png.flaticon.com/512/3135/3135715.png