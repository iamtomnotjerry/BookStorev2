import Link from "next/link";
import { CurrencyRupeeIcon } from "@heroicons/react/24/solid";
import AddToCart from "./AddtoCart";
import UpdateDeleteButton from "./UpdateDeleteButton";

// Assuming Book is an interface with the necessary properties
interface Book {
  id: string;
  title: string;
  imageUrl: string;
  // Add other properties as needed
}

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  return (
    <Link href={`/store/${book.id}`}>
      <div className="flex flex-col items-center rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="mb-2 h-13 flex justify-center">
          <img
            className="rounded-md" 
            src={book.imageUrl}
            alt={book.title}
            width={150}
            height={100}
            style={{ height: '200px', width: 'auto'}}

          />
        </div>
        <div>
          <h3 className="ml-2 text-sm font-medium">{book.title}</h3>
        </div>
        {/* Additional code */}
      </div>
    </Link>
  );
};

export default BookCard;
