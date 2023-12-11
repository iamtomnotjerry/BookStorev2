import { BookOpenIcon } from "@heroicons/react/24/solid";

// Importing the BookOpenIcon from the Heroicons library.
// The icon is imported from the "solid" set and has a size of 24 pixels.

const Logo = () => {
  return (
    // Outer container div with flex row direction, centered items, no additional space (leading-none), and white text color.
    <div className="flex flex-row items-center leading-none text-white">

      {/* Render the BookOpenIcon component with a width and height of 12 pixels. */}
      <BookOpenIcon className="w-12 h-12" />

      {/* Paragraph element with a font size of 28 pixels, left margin of 1 unit. */}
      <p className="text-[28px] ml-1">BookStore</p>
    </div>
  );
};

// Exporting the Logo component to be used in other parts of the application.
export default Logo;
