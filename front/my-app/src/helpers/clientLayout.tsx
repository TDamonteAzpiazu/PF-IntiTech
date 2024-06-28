'use client';

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";


const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    return (
        <>
            {pathname !== "/login" && <Navbar />}
            {children}
            {pathname !== "/login" && <Footer />}
        </>
    );
}


export default ClientLayout;