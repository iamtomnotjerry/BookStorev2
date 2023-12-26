// UpdateDeleteBook.tsx
import React, { useEffect, useState } from 'react';
import BookListv2 from './BookListv2';
import SearchBar from '../SearchBar';

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

export default function UpdateDeleteBook() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/books');
        const { books } = await response.json();
        setBooks(books);
        setFilteredBooks(books);

      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (searchTerm: string) => {
    // Update the searchTerm state and filter books based on it
    setSearchTerm(searchTerm);

    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch}/>
      <BookListv2
        books={filteredBooks}
      />
    </div>
  );
}
