import Image from 'next/image'
import React from 'react'
import backgroundImage from '@/../public/signin/signin.jpg';
import SignUp from '@/app/ui/auth/SignUp';
export default function SignInPage() {
  return (
    <div className='flex flex-col relative justify-center items-center h-screen'>
      <Image
          src={backgroundImage}
          alt="Background Image"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}  // Style for covering the container with the image
        />
      <div className="justify-center items-center z-10 bg-purple-100">
        <SignUp/>
      </div>
      
    </div>
  )
}
