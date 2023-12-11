'use client'
import {useSession} from 'next-auth/react'

export default function Page() {
  const {data:session} = useSession();
  return (
    <div className="p-2 flex flex-col w-full">
      <h2 className="text-3xl">Welcome {session?.user?.name}</h2>
    </div>
  )
}
