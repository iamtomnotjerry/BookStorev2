// BookCardv2.tsx
import React from 'react';
import UpdateDeleteButton from '../books/UpdateDeleteButton';

interface Book {
  _id: string;
  title: string;
  imageUrl: string;
  author: string;
  // Add other properties as needed
}

interface BookCardv2Props {
  book: Book;
}
const BookCardv2: React.FC<BookCardv2Props> = ({ book }) => {
  return (
    <div className="flex items-center p-4 border border-gray-300 rounded-md shadow-md mb-4">
      <img
        src={book.imageUrl}
        alt={book.title}
        style={{ maxWidth: '100%', maxHeight: '200px' }} // Adjust the maximum width and height as needed
        className="mr-4 rounded-md"
      />
      <div>
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p className="text-gray-600">{book.author}</p>
        <div className="flex mt-2">
          <UpdateDeleteButton />
          {/* Add other buttons or components here */}
        </div>
        {/* Render other book details as needed */}
      </div>
    </div>
  );
};

export default BookCardv2;