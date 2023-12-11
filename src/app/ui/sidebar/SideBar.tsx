
import Link from 'next/link';

import Logo from './Logo';
import NavLinks from './NavLinks';
import ButtonSignOut from './ButtonSignOut';

// Define a functional React component named SideBar
export default function SideBar() {
  
  return (
    // Outer container div with flex column direction, full height, and padding
    <div className="flex h-full flex-col px-3 py-4 md:px-2">

      {/* Next.js Link component for navigation */}
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-purple-600 p-4 md:h-30"
        href="/bookstore"
      >
        {/* Logo component */}
        <div>
          <Logo />
        </div>
      </Link>

      {/* Container for navigation links and a sign-out button */}
      <div className="flex flex-wrap md:flex-col gap-2">

        {/* Navigation links component */}
        <NavLinks />

        {/* Form with a button for sign-out */}
        <ButtonSignOut/>
        

      </div>
    </div>
  );
}
