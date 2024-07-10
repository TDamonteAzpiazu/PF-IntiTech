'use client';

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();


    return (
        <>
            {pathname !== "/login" && pathname !== "/profile/activate" && pathname !== "/payOk" && pathname !== "/payWrong" && <Navbar />}
            {children}
            {pathname !== "/login" && pathname !== "/profile/activate" && pathname !== "/payOk" && pathname !== "/payWrong" && <Footer />}
        </>
    );
}


export default ClientLayout;