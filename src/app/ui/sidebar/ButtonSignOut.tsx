'use client'
import { signOut } from 'next-auth/react';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';

export default function ButtonSignOut() {
  const handleLogout =  ()=>{
    signOut()
  }
  return (
      <button
        className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-pink-400 md:flex-none md:justify-start md:px-3"
        onClick={handleLogout}
      >
        {/* Heroicon for an arrow left on a rectangle */}
        <ArrowLeftOnRectangleIcon className="w-6" />
        <div className="hidden md:block">Sign Out</div>
      </button>
  );
}
