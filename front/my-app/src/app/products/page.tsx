import React from 'react'
import { Product_Container } from '@/components/product_container'
import { get_product_DB } from '@/helpers/products.helper'
import { Iproducts_props } from '@/interfaces/interfaces'



const products_db:React.FC = async() =>{
const products_db: Iproducts_props[]= await get_product_DB()
  return (
    <div >
    <Product_Container product={products_db}/>
    </div>
  )
}
export default products_db
 