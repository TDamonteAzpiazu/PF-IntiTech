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

    const handleChange = () =>{
        console.log("hola")
    }

    return (
        <div className="h-20 ">
            {
                userData ? (
                    <div className="flex items-center justify-between h-full">
                        <div className="h-full w-24 ml-8">
                            <img className="h-full" src="https://pbs.twimg.com/media/GRG86T6W0AA6TyU?format=png&name=medium" alt="" />
                        </div>
                        <nav className="h-full">
                            <ul className="flex items-center w-full h-full ">
                                <li className=" flex items-center gap-5 h-full ">
                                    <Link className="flex items-center h-full w-20 font-medium justify-center hover:border-b hover:border-black" href="/">Home</Link>
                                    <Link className="flex items-center h-full w-20 font-medium justify-center hover:border-b hover:border-black" href="/">Products</Link>
                                    <Link className="flex items-center h-full w-20 font-medium justify-center hover:border-b hover:border-black" href="/">About us</Link>
                                </li>
                            </ul>
                        </nav>
                        {
                            userData ? (
                                <div className="flex items-center gap-5 h-full">
                                    <Link className="flex items-center h-full w-20 font-medium justify-center hover:border-b hover:border-black" href="/dashboard">Dashboard</Link>
                                    <Link className="flex items-center h-full w-20 font-medium justify-center hover:border-b hover:border-black" onClick={handleLogout} href="/">Sign Out</Link>
                                </div>
                            ) : (
                                <div className="flex items-center gap-5 h-full">
                                    <Link className="flex items-center h-full w-20 font-medium justify-center hover:border-b hover:border-black" href="/login">Sign In</Link>
                                    <Link className="flex items-center h-full w-20 font-medium justify-center hover:border-b hover:border-black" href="/signup">Sign Up</Link>
                                </div>
                            )
                        }
                    </div>
                ) : (
                    <div className="flex items-center justify-between h-full">
                        <div className="h-full w-24 ml-8">
                            <img className="h-full" src="https://pbs.twimg.com/media/GRG86T6W0AA6TyU?format=png&name=medium" alt="" />
                        </div>
                        <nav className="h-full">
                            <ul className="flex items-center w-full h-full ">
                                <li className=" flex items-center gap-5 h-full ">
                                    <Link className="flex items-center h-full w-20 font-medium justify-center hover:border-b hover:border-black" onClick={handleChange} href="/">Home</Link>
                                    <Link className="flex items-center h-full w-20 font-medium justify-center hover:border-b hover:border-black"  href="/products">Products</Link>
                                    <Link className="flex items-center h-full w-20 font-medium justify-center hover:border-b hover:border-black"  href="/about">About us</Link>
                                </li>
                            </ul>
                        </nav>
                        <div className="mx-5">
                            <button onClick={handleClick} className="w-20 bg-yellowcustom bg-custom-radial bg-size-200 hover:bg-right text-white px-4 py-2 rounded-lg transition-all duration-500">
                                <a href="/login">Login </a></button>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default Navbar;
// https://cdn-icons-png.flaticon.com/512/3135/3135715.png