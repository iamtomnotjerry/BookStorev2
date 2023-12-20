import React, { useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfViewerProps {
  pdfUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [visiblePages, setVisiblePages] = useState<number[]>([]);

  const handleResize = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setVisiblePages([1]); // Initially, only render the first page
  }, []);

  const handlePageVisible = useCallback((pageIndex: number) => {
    setVisiblePages((prevVisiblePages) => {
      if (!prevVisiblePages.includes(pageIndex)) {
        return [...prevVisiblePages, pageIndex];
      }
      return prevVisiblePages;
    });
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh', overflowX: 'hidden' }}>
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {visiblePages.map((pageIndex) => (
          <div key={`page_${pageIndex}`} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Page
              key={pageIndex}
              pageNumber={pageIndex}
              renderMode="canvas"
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={width * 0.8}
              onRenderSuccess={() => handlePageVisible(pageIndex + 1)}
            />
          </div>
        ))}
      </Document>
    </div>
  );
};

export default React.memo(PdfViewer);
