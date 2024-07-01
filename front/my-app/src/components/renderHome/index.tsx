import Link from "next/link";
import React from "react";

const RenderHome = () => {
    return (
        <div className="h-screen bg-custom-image bg-no-repeat bg-size-200 text-white">
            <div className="flex justify-center items-center h-full gap-12">
                <div className="w-1/2 mt-10">
                    <h1 className="text-5xl font-medium mb-5 pl-12 leading-snug">Desarrollo de tecnología robótica para plantas fotovoltaicas</h1>
                    <p className="pl-12 text-lg mb-20">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, deserunt.</p>
                    <Link href="/contact"><button className=" w-48 transition-all duration-300 bg-yellowinti hover:bg-lightorangeinti text-black font-medium py-2 px-6 rounded-full ml-12" >View services</button></Link>
                    
                </div>
                <div className="w-1/2 mt-10 flex flex-col text-end place-items-end">
                    <button className="transition-all duration-300 bg-yellowinti hover:bg-lightorangeinti text-black font-medium py-2 px-6 rounded-full w-48 mr-12">View products</button>
                    <h1 className="text-5xl mt-20 pr-12 font-medium leading-snug">Lorem, ipsum dolor sit amet consectetur adipisicing</h1>
                    <p className="pr-12 text-lg mt-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor, deserunt assumenda est Providerat!</p>
                </div>
            </div>
        </div>
    );
};

export default RenderHome;