'use client';
import { Icart } from "@/interfaces/interfaces";
import { DataStore } from "@/store/dataStore";
import { UserStore } from "@/store/userStore";
import { Transition } from '@headlessui/react';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import cartLogo from "../../../public/images/cart.png";
import Cart from "../cart/cartMenu"

const Navbar = () => {
  const token = UserStore((state) => state.token);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userData = DataStore((state) => state.userDataUser);
  const [items, setItems] = useState<Icart[]>([]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };


  const handleLogout = () => {
    document.cookie = 'userToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; samesite=strict';
    localStorage.removeItem('user');
    window.location.reload();
    router.push('/');
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  const getCartItems = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/getItems/${userData.cart?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch cart items");
      }
      const data = await res.json();
      setItems(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartItems();
  }, [userData.cart?.id, items.length, isCartOpen]);

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    console.log('entra aqui pa')
  };

  return (
    <div className="h-20 bg-gradient-to-bottom text-white sticky top-0 w-full z-50 px-10">
      {token !== "" || token ? (
        <div className="flex items-center justify-between h-full">
          <div className="h-full w-24 ml-8">
            <Link href="/">
              <Image className="h-24-mt-3" src="/images/logo.png" alt="logo" width={100} height={100} />
            </Link>
          </div>
          <nav className="hidden lg:block h-full">
            <ul className="flex items-center w-full h-full">
              <li className="flex items-center gap-5 h-full font-medium">
                <Link className="text-center hover:border-b-2 hover:border-black" href="/">Inicio</Link>
                <Link className="text-center hover:border-b-2 hover:border-black" href="/products">Productos</Link>
                <Link className="text-center hover:border-b-2 hover:border-black" href="/about">Nosotros</Link>
              </li>
            </ul>
          </nav>
          {token !== "" && (
            <div className="flex items-center">
              <div>
                <button onClick={toggleCart} className="flex items-center mr-5">
                  <Image src={cartLogo} alt="cart" width={30} height={30} />
                </button>
                <Cart isOpen={isCartOpen} toggleCart={toggleCart} items={items} setItems={setItems} />
              </div>
              <div ref={dropdownRef} className="relative">
                <button className="flex items-center mr-5" onClick={handleClick}>
                  Bienvenido de nuevo!
                  {!open ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 15.75 7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  )}
                </button>
                <Transition
                  show={open}
                  enter="transition ease-out duration-300"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-300"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <div className="backdrop-blur-md bg-white absolute top-10 right-2 flex flex-col items-center rounded-lg text-black z-50 w-44">
                    <a href="/profile" className="p-2 text-base flex items-center justify-between w-full hover:bg-black/10 hover:rounded-t-lg transition-all duration-200">
                      Perfil
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    </a>
                    <a href="/orders" className="p-2 text-base flex items-center justify-between w-full hover:bg-black/10 transition-all duration-200">
                      Historial
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                      </svg>
                    </a>
                    <a href="/dashboard" className="p-2 text-base flex items-center justify-between w-full hover:bg-black/10 transition-all duration-200">
                      Dashboard
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
                      </svg>
                    </a>
                    <a href="/dashboard" className="lg:hidden md:hidden p-2 text-base flex items-center justify-between w-full hover:bg-black/10 transition-all duration-200">
                      Inicio
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
                      </svg>
                    </a>
                    <a href="/dashboard" className="lg:hidden md:hidden p-2 text-base flex items-center justify-between w-full hover:bg-black/10 transition-all duration-200">
                      Productos
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
                      </svg>
                    </a>
                    <a href="/dashboard" className="lg:hidden md:hidden p-2 text-base flex items-center justify-between w-full hover:bg-black/10 transition-all duration-200">
                      Nosotros
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
                      </svg>
                    </a>
                    <button
                      onClick={handleLogout}
                      className="p-2 text-base cursor-pointer flex items-center justify-between w-full hover:text-red-600 hover:bg-black/10 hover:rounded-b-lg transition-all duration-200"
                    >
                      Cerrar Sesión
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                        />
                      </svg>
                    </button>
                  </div>
                </Transition>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center w-full justify-between h-full">
          <div className="h-full w-24 ml-8">
            <Link href="/">
              <Image className="h-24-mt-3" src="/images/logo.png" alt="logo" width={100} height={100} />
            </Link>
          </div>
          <div>
            <div className="lg:hidden" onClick={toggleOpen}>
              <button >
                {isOpen ? <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(45)">
                  <g id="SVGRepo_bgCarrier" stroke-width="0" />
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                  <g id="SVGRepo_iconCarrier"> <rect width="24" height="24" /> <path d="M12 6V18" stroke="#ffff" stroke-linecap="round" stroke-linejoin="round" /> <path d="M6 12H18" stroke="#ffff" stroke-linecap="round" stroke-linejoin="round" /> </g>
                </svg> : <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0" />
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                  <g id="SVGRepo_iconCarrier"> <rect width="24" height="24" /> <path d="M6 12H18" stroke="#ffff" stroke-linecap="round" stroke-linejoin="round" /> <path d="M6 15.5H18" stroke="#ffff" stroke-linecap="round" stroke-linejoin="round" /> <path d="M6 8.5H18" stroke="#ffff" stroke-linecap="round" stroke-linejoin="round" /> </g>
                </svg>}
              </button>
            </div>

            <nav className="h-full ">

              <ul className={`lg:flex lg:flex-row lg:items-center lg:h-full lg:gap-10 lg:w-full lg:bg-transparent lg:text-white lg:rounded-none lg:static rounded-lg absolute right-10 w-fit flex-col bg-white text-black ${isOpen ? 'flex' : 'hidden'
                }`}>
                  <li className="flex lg:flex-row flex-col items-center font-medium w-36 lg:w-fit">
                    <Link className="lg:hidden lg:hover:border-white lg:hover:border-b p-2 hover:bg-black/10 w-full text-left" href="/login">Ingresar</Link>
                    <Link className="lg:hover:border-white lg:text-center lg:hover:border-b p-2 hover:bg-black/10 w-full text-left " href="/">Inicio</Link>
                    <Link className="lg:hover:border-white lg:text-center lg:hover:border-b p-2 hover:bg-black/10 w-full text-left " href="/products">Productos</Link>
                    <Link className="lg:hover:border-white lg:text-center lg:hover:border-b p-2 hover:bg-black/10 w-full text-left " href="/about">Nosotros</Link>
                  </li>
              </ul>
            </nav>
          </div>
          <div className="hidden lg:block lg:mx-5">
            <button className="border-2 border-white hover:text-black hover:bg-white text-white px-4 py-2 rounded-lg transition-all duration-500">
              <a href="/login">Ingresar</a></button>
          </div>
        </div>
      )
      }
    </div>
  )
}

export default Navbar;