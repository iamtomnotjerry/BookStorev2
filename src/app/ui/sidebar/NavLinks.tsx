'use client'
import { useContext } from "react";
import { StoreContext } from "@/app/context";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { 
  CubeTransparentIcon,
  BookOpenIcon, 
  CogIcon, 
} from "@heroicons/react/24/outline";

const links = [
  
  { name: 'Books', href: '/store', icon: BookOpenIcon },
  { name: 'Settings', href: '/store/settings', icon: CogIcon },
  { name: 'Admin', href: '/store/admin', icon: CubeTransparentIcon },
];

const NavLinks = () => {
  const { cartData } = useContext(StoreContext);
  const pathname = usePathname();

  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const isAdmin = userEmail === '23560004@gm.uit.edu.vn';

  return (
    <>
      {links.map((link) => {
        const IconComponent = link.icon;
        const isActive = pathname === link.href;
  
        // Check if the link is "Admin" and the user is not an admin, then skip rendering
        if (link.name === 'Admin' && !isAdmin) {
          return null;
        }
  
        return (
          
          <Link
            prefetch={false}
            key={link.name}
            href={link.href}
            
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium 
              hover:bg-sky-100 hover:text-pink-400 md:flex-none md:justify-start md:p-2 md:px-3 
              ${isActive ? 'bg-sky-100 text-pink-400' : 'bg-gray-50 text-black'}`}
          >
            <IconComponent className="w-6" />
            <p className="hidden md:block">
              {(link.name === 'Cart' && cartData && cartData.length > 0)
                ? `${link.name}(${cartData.length})`
                : `${link.name}`}
            </p>
          </Link>
        );
      })}
    </>
  );
};




export default NavLinks;
