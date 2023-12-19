'use client'


import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function UploadBook({ onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [book, setBook] = useState({
    title: '',
    author: '',
    imageUrl: '',
    pdfFile: null,
  });

  // Use the useSession hook to get the session data

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
      const pdfFormData = new FormData();
      pdfFormData.append('pdfFile', book.pdfFile);
      // Send a POST request to the backend API (adjust the URL accordingly)
      const pdfResponse = await fetch('/api/uploadpdf', {
        method: 'POST',
        body: pdfFormData,
      });
      if (pdfResponse.ok) {
        // Retrieve the PDF data from the response
        const pdfData = await pdfResponse.json();

        // Now, send a POST request to upload the book details
        const bookFormData = new FormData();
        bookFormData.append('title', book.title);
        bookFormData.append('author', book.author);
        bookFormData.append('imageUrl', book.imageUrl);
        bookFormData.append('pdfId', pdfData._id); // Use the identifier from the PDF upload

        // Send a POST request to upload the book details
        const bookResponse = await fetch('/api/uploadbook', {
          method: 'POST',
          body: bookFormData,
        });
        if (bookResponse.ok) {
          console.log('Book and PDF uploaded successfully!');
          toast.success('Book and PDF uploaded successfully!');
        } else {
          console.error('Failed to upload the book');
          toast.error('Failed to upload the book');
        }
        
      }else {
        console.error('Failed to upload the PDF');
        toast.error('Failed to upload the PDF');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An errorr occurred while uploading the book');
    } finally {
      setIsSubmitting(false);
    }
    
  };

  return (
    <div >
      <h2 className="text-2xl font-semibold mb-4">Upload Your Book</h2>
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
          {isSubmitting ? 'Submitting...' : 'Upload'}
        </button>
      </form>
    </div>
  )
}
