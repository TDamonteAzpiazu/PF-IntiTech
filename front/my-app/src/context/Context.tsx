'use client'
import { Icontext_props, Icontext_provider, Isession_active } from "@/interfaces/interfaces"
import { createContext, useContext, useState, useEffect } from "react"


const Context = createContext<Icontext_props>(
          {
                    user_data:null,
                    setUser_data: ()=>{}
          }
)


export const Context_Provider: React.FC<Icontext_provider> = ({children})=>{
          const [user_data, setUser_data] = useState<Isession_active|null>(null)

          useEffect(()=>{
                    if (user_data) {
                              localStorage.setItem('user_active',JSON.stringify({token:user_data}))
                    }
          },[user_data])

          useEffect(()=>{
                    if (typeof window !== "undefined" && window.localStorage) {
                    const user = localStorage.getItem('user_active')
                    setUser_data(JSON.parse(user!))
                    }
          },[])

          return (
                    <Context.Provider value={{user_data, setUser_data}}> 
                    {children}
                    </Context.Provider>
          )
}

export const useAuth_context = () => useContext(Context)