'use client'
// Import necessary dependencies
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react'; // Import useSession hook

// Define the SellTable component
export default function SellTable() {
  // State to manage form data and submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [book, setBook] = useState({
    title: '',
    author: '',
    imageUrl: '',
    pdfFile: null,
  });

  // Use the useSession hook to get the session data
  const { data: session } = useSession();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Check if the input is a file input
    if (type === 'file') {
      // Update the state with the selected file
      setBook((prevBook) => ({ ...prevBook, [name]: e.target.files[0] }));
    } else {
      // Update other form fields
      setBook((prevBook) => ({ ...prevBook, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('title', book.title);
      formData.append('author', book.author);
      formData.append('imageUrl', book.imageUrl);
      formData.append('pdfFile', book.pdfFile);
      formData.append('userEmail', session?.user?.email);

      // Send a POST request to the backend API (adjust the URL accordingly)
      const res = await fetch('/api/sell', {
        method: 'POST',
        body: formData,
      });

      // Check if the submission was successful
      if (res.ok) {
        // Handle successful submission
        console.log('Book sold successfully!');
        toast.success('Book sold successfully!');
        // You can add more logic here for a successful response
      } else {
        // Handle error response
        console.error('Failed to sell the book');
        toast.error('Failed to sell the book');
        // You can add more logic here for error handling
      }
    } catch (error) {
      // Handle other errors if needed
      console.error('An error occurred:', error);
      toast.error('An error occurred while selling the book');
    } finally {
      // Reset submission status
      setIsSubmitting(false);
    }
  };

  // Render the component
  return (
    <div className="max-w-md p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Sell Your Book</h2>
      <form onSubmit={handleSubmit}>
        {/* Title input */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-600">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={book.title}
            onChange={handleChange}
            className="mt-1 p-2 w-full md:w-96 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Author input */}
        <div className="mb-4">
          <label htmlFor="author" className="block text-sm font-medium text-gray-600">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={book.author}
            onChange={handleChange}
            className="mt-1 p-2 w-full md:w-96 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* Image URL input */}
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-600">
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={book.imageUrl}
            onChange={handleChange}
            className="mt-1 p-2 w-full md:w-96 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {/* PDF file input */}
        <div className="mb-4">
          <label htmlFor="pdfFile" className="block text-sm font-medium text-gray-600">
            PDF File
          </label>
          <input
            type="file"
            id="pdfFile"
            name="pdfFile"
            onChange={handleChange}
            className="mt-1 p-2 w-full md:w-96 border rounded-md focus:outline-none focus:border-blue-500"
            accept=".pdf" // Specify accepted file types (PDF in this case)
            required
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Sell'}
        </button>
      </form>
    </div>
  );
}
