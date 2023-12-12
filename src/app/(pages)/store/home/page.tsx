'use client';
import React, { useEffect, useState } from 'react';
import SearchBar from '@/app/ui/SearchBar';
import BookList from '@/app/ui/books/BookList';
import { useSession } from 'next-auth/react';

interface Book {
  title: string;
  // Add other properties as needed
}

// ... (previous imports)

export default function StorePage() {
  const { data: session } = useSession();
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // Set initial loading state to false
  const [error, setError] = useState<string | null>(null);
  const userEmail = session?.user?.email;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (userEmail) {
          const response = await fetch(`http://localhost:3000/api/booksbyemail?email=${userEmail}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session?.accessToken}`,
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
          }

          const { books } = await response.json();
          setBooks(books);
          setFilteredBooks(books);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        setError('Failed to fetch books. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    // Only fetch data if books state is empty or userEmail has changed
    if (userEmail && (books.length === 0 || userEmail !== books[0]?.userEmail)) {
      fetchData();
    }
  }, [userEmail, session]);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);

    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl">Welcome {session?.user?.name || 'Guest'}</h2>
      <SearchBar onSearch={handleSearch} />
      <BookList books={filteredBooks}/>
    </div>
  );
}