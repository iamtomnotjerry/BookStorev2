'use client'
import { useParams } from 'next/navigation'; // Changed from 'next/navigation' to 'next/router'
import { useEffect, useState } from 'react';
interface PdfContent {
  data: ArrayBuffer;
  // Other properties if present
}
const PDFViewerPage = () => {
  const { id } = useParams(); // Destructure id directly from useParams()
  const [book, setBook] = useState(null);
  const [pdfContent, setPdfContent] = useState<PdfContent | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookResponse = await fetch(`/api/books/${id}`);
        if (!bookResponse.ok) {
          throw new Error('Failed to fetch book data');
        }
        const { book } = await bookResponse.json();
        setBook(book);

        const pdfResponse = await fetch(`/api/pdf/${book.pdfId}`);
        if (!pdfResponse.ok) {
          throw new Error('Failed to fetch PDF content');
        }
        const { pdfContent } = await pdfResponse.json();
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
      <iframe
        className="w-full h-screen"
        id="pdfViewer"
        title="PDF Viewer"
        src={dataUrl}
      ></iframe>
    </div>
  );
};

export default PDFViewerPage;
