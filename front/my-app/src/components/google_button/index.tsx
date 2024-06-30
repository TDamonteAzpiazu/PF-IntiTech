import React from 'react'
import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Idata_google, auth_google } from '@/helpers/auth.google'

interface Itoken{
          token:string, 
          name:string,
          email:string
}
interface Ibutton{
          button: ()=>void
}
export const Butto:React.FC<Ibutton> = ({button:Ibutton}) =>{

           const router = useRouter()
           useEffect(()=>{
                    const { token } = router.query
                    const decode_token:Itoken = jwtDecode<Itoken>(token as string)
                    const autentication_data:Idata_google={
                              email:decode_token.email,
                              name:decode_token.name,
                    }
                    auth_google(autentication_data)
           },[])

           const handle_login_google = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
                    
           }
           

 
  return (
    <div>
      <button>
          BUTTON DE PRUEBA
      </button>
    </div>
  )
}
