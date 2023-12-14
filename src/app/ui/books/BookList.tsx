import React from 'react';
import BookCard from './BookCard';

interface Book {
  id: string; // assuming id is a string based on mongoose ObjectId
  title: string;
  author: string;
  genre?: string;
  description?: string;
  price: number;
  stock?: number;
  imageUrl: string;
  userEmail: string;
}

interface BookListProps {
  books: Book[] | null | undefined;
  userEmail: string;
}

const BookList: React.FC<BookListProps> = ({ books, userEmail = '' }) => {
  return (
    <div className="flex flex-wrap p-2 justify-center gap-2">
      {Array.isArray(books) && books.length > 0 ? (
        books.map((book) => (
          <BookCard key={book.id} book={book} userEmail={userEmail} />
        ))
      ) : (
        <p>No books available</p>
      )}
    </div>
  );
};

export default BookList;
