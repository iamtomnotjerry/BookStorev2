'use client'
// pages/store/[id].tsx
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const PDFViewerPage = () => {
  const id = useParams().id;
  const [book, setBook] = useState(null);
  const [pdfContent, setPdfContent] = useState(null);
  useEffect(() => {
    // Define an async function to fetch book data
    const fetchBook = async () => {
      try {
        const bookresponse = await fetch(`/api/books/${id}`);
        if (!bookresponse.ok) {
          throw new Error('Failed to fetch book data');
        }
        const { book } = await bookresponse.json();
        setBook(book);

        const pdfresponse = await fetch(`/api/pdf/${book.pdfId}`)
        if (!pdfresponse.ok){
          throw new Error('Failed to fetch book data');
        }
        const {pdfContent} = await pdfresponse.json()
        setPdfContent(pdfContent)
        
        
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
      
    };

    // Call the async function inside the useEffect
    if (id) {
      fetchBook();
    }
  }, [id]);

  if (!book || !pdfContent) {
    return <p>Loading...</p>;
  }
  console.log(pdfContent.data)
  

  return (
    <div>
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <h1>pdfId: {book.pdfId}</h1>
      {/* <embed id="pdfViewer" type="application/pdf" width="100%" height="600" src={pdfViewerUrl} /> */}
    </div>
  );
};

export default PDFViewerPage;
