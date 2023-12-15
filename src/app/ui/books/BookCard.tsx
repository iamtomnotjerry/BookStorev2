import Link from 'next/link';

// Assuming Book is an interface with the necessary properties
interface Book {
  _id: string;
  title: string;
  imageUrl: string;
  author: string;
  // Add other properties as needed
}

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  return (
    
    <Link href={`/store/${book._id}`}>
      <div className="flex flex-col items-center rounded-xl overflow-hidden bg-white shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
        <div className="h-48 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={book.imageUrl}
            alt={book.title}
          />
        </div>
        <div className="p-4 w-full">
          <h3
            className="text-xl font-bold mb-2 overflow-hidden overflow-ellipsis max-h-14 whitespace-normal text-gray-900 font-serif"
          >
            {book.title}
          </h3>
          <p className="text-gray-600">{book.author}</p>

        </div>
      </div>
    </Link>
  );
};

export default BookCard;
