'use client'
// pages/store/[id].tsx
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const BookPage = () => {
  const id = useParams().id;
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Define an async function to fetch book data
    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch book data');
        }
        const { book } = await response.json();
        setBook(book);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    // Call the async function inside the useEffect
    if (id) {
      fetchBook();
    }
  }, [id]);

  if (!book) {
    return <p>Loading...</p>;
  }

  // Assuming book.pdfFile is a binary buffer

  const blob = new Blob([book.pdfFile], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);


  return (
    <div>
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Description: {book.description}</p>
      <p>Price: ${book.price}</p>
      <p>Stock: {book.stock}</p>


      <embed id="pdfViewer" type="application/pdf" width="100%" height="600" src={url} />
    </div>
  );
};

export default BookPage;
