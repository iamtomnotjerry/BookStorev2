// BookListv2.tsx
import React from 'react';
import BookCardv2 from './BookCardv2';

interface Book {
  _id: string;
  title: string;
  author: string;
  genre?: string;
  description?: string;
  price: number;
  stock?: number;
  imageUrl: string;
}

interface BookListv2Props {
  books: Book[] | null | undefined;

}

const BookListv2: React.FC<BookListv2Props> = ({books}) => {
  if (books === undefined) {
    return <p>Loading...</p>;
  }
  if (books === null || books.length === 0) {
    return <p>No books available</p>;
  }

  return (
    <div className='p-2' style={{ width: '400px', height: '300px', overflow: 'auto' }}>
      {books.map((book) => (
        <BookCardv2 key={book._id} book={book}  />
      ))}
    </div>
  );
};

export default BookListv2;
