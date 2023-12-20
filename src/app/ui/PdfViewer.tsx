import React, { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfViewerProps {
  pdfUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [width, setWidth] = useState(window.innerWidth * 0.8); // Initial width based on window.innerWidth
  const [pagesToRender, setPagesToRender] = useState<number[]>([]);

  useEffect(() => {
    // Update the width when the window is resized
    const handleResize = () => {
      setWidth(window.innerWidth * 0.8);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures that this effect runs only once

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPagesToRender(Array.from({ length: numPages }, (_, index) => index + 1));
  }, []);

  const renderPages = useCallback(() => {
    return pagesToRender.map((pageNumber) => (
      <div key={`page_${pageNumber}`} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Page pageNumber={pageNumber} renderMode="canvas" renderTextLayer={false} renderAnnotationLayer={false} width={width} />
      </div>
    ));
  }, [pagesToRender, width]);

  return (
    <div style={{ width: '100%', height: '100vh', overflowX: 'hidden' }}>
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {renderPages()}
      </Document>
    </div>
  );
};

export default React.memo(PdfViewer);
