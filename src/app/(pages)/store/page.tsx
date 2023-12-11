// pages/store/index.js
'use client';
import React, { useEffect, useState } from 'react';
import BookList from '../../ui/books/BookList';
import SearchBar from '@/app/ui/SearchBar';

export default function StorePage() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch books and set them to both books and filteredBooks initially
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/books');
        const { books } = await response.json();
        setBooks(books);
        setFilteredBooks(books);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    // Update the searchTerm state and filter books based on it
    setSearchTerm(searchTerm);

    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  return (
    <div className="flex flex-col items-center">
      <SearchBar onSearch={handleSearch} />
      <BookList books={filteredBooks} />
    </div>
  );
}
