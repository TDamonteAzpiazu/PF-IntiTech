import styles from './style.module.css'
import { HiOutlineShoppingCart } from "react-icons/hi";
import React from 'react'
interface Props {
    addTocart: () => void
}

const BotonCart = ({addTocart}: Props) => {
    return (
        <button onClick={addTocart} className={styles.btn}>
            <div className={styles.textContainer}>
                <span className={styles.text}>
                    <HiOutlineShoppingCart className='text-2xl mr-4' strokeWidth={1.5} />  Agregar al carrito
                </span>
                <span className={styles.text}>
                    <HiOutlineShoppingCart className='text-2xl mr-4' strokeWidth={1.5} />  Agregar al carrito
                </span>

            </div>

        </button>
    )
}

export default BotonCart