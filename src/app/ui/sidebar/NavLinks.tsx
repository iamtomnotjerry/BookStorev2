
'use client'
// Importing specific icons from the Heroicons library
import { 
    HomeIcon, 
    UserGroupIcon, 
    BookOpenIcon, 
    CubeTransparentIcon, 
    RectangleStackIcon, 
    CogIcon, 
    TruckIcon,
    Squares2X2Icon, 
    ShoppingCartIcon 
  } from "@heroicons/react/24/solid";
  import { useContext } from "react";
  import { StoreContext } from "@/app/context";
  // Importing the Link component from Next.js
  import Link from "next/link";
  
  // An array of objects representing navigation links with names, hrefs, and corresponding icons
  const links = [
    { name: 'Home', href: '/store/home', icon: HomeIcon },
    { name: 'Store', href: '/store', icon: BookOpenIcon },
    { name: 'Sell', href: '/store/sell', icon: RectangleStackIcon },
    { name: 'Cart', href: '/store/cart', icon: ShoppingCartIcon },
    { name: 'Track Order', href: '/store/track-order', icon: TruckIcon },
    { name: 'Community', href: '/store/community', icon: UserGroupIcon },
    { name: 'Settings', href: '/store/settings', icon: CogIcon },
    { name: 'About', href: '/store/about', icon: Squares2X2Icon },
    { name: 'Admin', href: '/store/admin', icon: CubeTransparentIcon },
  ];
  
  // Functional component for rendering navigation links
  const NavLinks = () => {
    const {cartData} = useContext(StoreContext)
    return (
      <>
        {links.map((link) => {
          // Dynamically assigning the imported icon component based on the current link
          const IconComponent = link.icon;
  
          return (
            // Using Next.js Link component to create navigation links
            <Link
              key={link.name}
              href={link.href}
              className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-purple-600 md:flex-none md:justify-start md:p-2 md:px-3"
            >
              {/* Rendering the dynamically assigned icon component */}
              <IconComponent className="w-6" />
              {/* Displaying the link name (hidden on small screens) */}
              <p className="hidden md:block">
              {(link.name==='Cart' && cartData && cartData.length > 0) 
                ? `${link.name}(${cartData.length})` : `${link.name}`}
              </p>
            </Link>
          );
        })}
      </>
    );
  };
  
  // Exporting the NavLinks component as the default export
  export default NavLinks;
  