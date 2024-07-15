import styles from './style.module.css'
import React from 'react'

const BotonService = () => {
    return (
            <button className={styles.btnService}>
                <svg> <rect x="0" y="0" fill="none" width="100%" height="100%" /></svg>
                Contratar
            </button>
    )
}

export default BotonService