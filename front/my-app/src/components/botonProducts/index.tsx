import styles from './style.module.css'
import React from 'react'

interface Iprops {
  title: string
}

const BotonProducts = ({title}: Iprops) => {
  return (
    <div>
        <button className={styles.ctaButton}>{title}</button>
    </div>
  )
}

export default BotonProducts