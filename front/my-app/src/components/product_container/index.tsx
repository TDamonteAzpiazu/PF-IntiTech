import { Iproducts_props } from '@/interfaces/interfaces'
import React from 'react'
import Product from '../product'

interface Icontainer_products {
          product:Iproducts_props[]
}
export const Product_Container: React.FC <Icontainer_products>=({product}) =>{
  return(
    <div className='flex items-center justify-around flex-wrap px-28 gap-8'>{
          product && product.map((item)=>(
                    <div key={item.id}>
                              <Product {...item} />
                    </div>
          ))
          }
    </div>
  )
}
