import React from 'react';
import BookCard from './BookCard';

interface Book {
  _id: string; // assuming id is a string based on mongoose ObjectId
  title: string;
  author: string;
  genre?: string;
  description?: string;
  price: number;
  stock?: number;
  imageUrl: string;
}

interface BookListProps {
  books: Book[] | null | undefined;
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  if (books === undefined) {
    return <p>Loading...</p>;
  }

  if (books === null || books.length === 0) {
    return <p>No books available</p>;
  }

  return (
    <div className="flex flex-wrap p-2 justify-center gap-2">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
