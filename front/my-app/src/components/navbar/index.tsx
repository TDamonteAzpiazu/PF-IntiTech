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
                                    {/* <Link href="/">Home</Link> */}
                                    {/* <Link href="/">About us</Link> */}
                                </li>
                            </ul>
                        </nav>
                    </div>
                ) : (
                    <div className="flex items-center h-full">
                        <div className="h-full w-24 border border-black ">
                            <img className="h-full" src="https://pbs.twimg.com/media/GRG86T6W0AA6TyU?format=png&name=medium" alt="" />
                        </div>
                        <nav>
                            <ul>
                                <li>
                                    {/* <Link href="/">Home</Link> */}
                                    {/* <Link href="/">About us</Link> */}
                                </li>
                            </ul>
                        </nav>
                    </div>
                )
            }

        </div>
    )
}

export default Navbar;
// https://cdn-icons-png.flaticon.com/512/3135/3135715.png