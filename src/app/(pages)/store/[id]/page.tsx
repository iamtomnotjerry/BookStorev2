'use client'
// Import necessary libraries and Tailwind CSS styles
// Import necessary libraries and Tailwind CSS styles
// Import necessary libraries and Tailwind CSS styles
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';

const PDFViewerPage = () => {
  const id = useParams().id;
  const [book, setBook] = useState(null);
  const [pdfContent, setPdfContent] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookresponse = await fetch(`/api/books/${id}`);
        if (!bookresponse.ok) {
          throw new Error('Failed to fetch book data');
        }
        const { book } = await bookresponse.json();
        setBook(book);

        const pdfresponse = await fetch(`/api/pdf/${book.pdfId}`);
        if (!pdfresponse.ok) {
          throw new Error('Failed to fetch PDF content');
        }
        const { pdfContent } = await pdfresponse.json();
        setPdfContent(pdfContent);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Optionally display an error message on the UI
        setBook(null);
        setPdfContent(null);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  if (!book || !pdfContent) {
    return <p className="text-center">Loading...</p>;
  }

  const uint8Array = new Uint8Array(pdfContent.data);
  const blob = new Blob([uint8Array], { type: 'application/pdf' });
  const dataUrl = URL.createObjectURL(blob);

  return (
    <div>
      <iframe className="w-full h-screen" id="pdfViewer" type="application/pdf" src={dataUrl} />
    </div>
    
  );
};

export default PDFViewerPage;
