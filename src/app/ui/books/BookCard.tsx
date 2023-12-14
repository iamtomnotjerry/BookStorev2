import Link from "next/link";
import { CurrencyRupeeIcon } from "@heroicons/react/24/solid";
import AddToCart from "./AddtoCart";
import UpdateDeleteButton from "./UpdateDeleteButton";

const BookCard = ({ book}) => {

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
            priority={true}
          />
        </div>
        <div>
          <h3 className="ml-2 text-sm font-medium">{book.title}</h3>
        </div>
        {/* <div>
          <div className="flex justify-around">
            <div className="flex">
              <CurrencyRupeeIcon className="w-5 mr-0.5" />
              <span className="text-sm"> {book.price}</span>
            </div>
          </div>
          {isCurrentUserBook ?<UpdateDeleteButton />  : <AddToCart book={book} />}
        </div> */}
      </div>
    </Link>
  );
};

export default BookCard;
