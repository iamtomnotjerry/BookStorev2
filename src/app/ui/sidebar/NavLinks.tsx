'use client'
import { useContext } from "react";
import { StoreContext } from "@/app/context";
import Link from "next/link";
import { usePathname } from 'next/navigation';

import { 

  BookOpenIcon, 
  CogIcon, 
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";

const links = [

  { name: 'Books', href: '/store', icon: BookOpenIcon },
  { name: 'Admin', href: '/store/admin', icon: CubeTransparentIcon },
  { name: 'Settings', href: '/store/settings', icon: CogIcon },
];

const NavLinks = () => {
  const { cartData } = useContext(StoreContext);
  const pathname =usePathname();


  return (
    <>
      {links.map((link) => {
        const IconComponent = link.icon;
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium 
              hover:bg-sky-100 hover:text-purple-600 md:flex-none md:justify-start md:p-2 md:px-3 
              ${isActive ? 'bg-sky-100 text-purple-600' : 'bg-gray-50 text-black'}`}
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
