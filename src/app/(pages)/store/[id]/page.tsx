'use client'
import PdfViewerOnComputer from '@/app/ui/PdfViewerOnComputer';
import PdfViewerOnMobile from '@/app/ui/PdfViewerOnMobile';
import { useParams } from 'next/navigation'; // Changed from 'next/navigation' to 'next/router'
import React from 'react';

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
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  return isMobile ? (
    <PdfViewerOnMobile pdfUrl={dataUrl} />
  ) : (
    <PdfViewerOnComputer pdfUrl={dataUrl} />
  );
};


export default React.memo(PDFViewerPage);
