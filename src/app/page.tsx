// Import necessary components and styles
import Image from 'next/image';  // Import the Image component from Next.js
import backgroundImage from '../../public/home/book-bg.png';  // Import the background image

import Link from 'next/link';  // Import the Link component from Next.js
import { BookOpenIcon } from '@heroicons/react/24/solid';  // Import the BookOpenIcon from Heroicons

// Define the Home functional component
export default function Home() {
  return (
    // Outer container with flex layout and centered content
    <div className='flex flex-col relative justify-center items-center h-screen'>
      {/* Background image using the Next.js Image component */}
      <Image
        src={backgroundImage}
        alt="Background Image"
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}  // Style for covering the container with the image
      />

      {/* Container with additional content, positioned above the background image */}
      <div className="p-2 flex flex-col justify-center items-center z-10 bg-purple-100 lg:w-2/5 h-1/4 rounded-md">
        {/* Title and icon */}
        <div className='flex pb-5 mb-5 text-5xl text-pink-400'>
          <BookOpenIcon className='w-12 h-12'/>  {/* BookOpenIcon from Heroicons */}
          <p>Free4Read</p>
        </div>

        {/* Link to the "/bookstore" page */}
        <div>
          {/* Use Link component to navigate without a full page reload */}
          <Link href="/auth/signin">
            {/* Apply styling to the link */}
            <div className='bg-pink-400 text-black rounded-sm p-2'>
              Take me to the books 
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
