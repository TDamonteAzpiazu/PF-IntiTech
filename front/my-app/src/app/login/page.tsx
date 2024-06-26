import Login from '@/components/login/login'
import React from 'react'
import background from '../../../public/images/background.jpg'
import Image from 'next/image'

const Page = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <Image 
        src={background} 
        alt="background" 
        layout="fill" 
        objectFit="cover" 
        quality={100}
        className="absolute top-0 left-0 w-full h-full"
      />
      <div className="relative z-10">
        <Login />
      </div>
    </div>
  )
}

export default Page
