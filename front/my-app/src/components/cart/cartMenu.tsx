import { useState } from "react";

const Cart=()=>{
    const [isOpen, setIsOpen] = useState(false);

    const toggleCart = () => {  
        setIsOpen(!isOpen);
    };
}