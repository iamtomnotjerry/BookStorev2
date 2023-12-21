import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'; // Import the annotation layer styles
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfViewerProps {
  pdfUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect.width !== containerWidth) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [containerWidth]);

  // Function to handle document load success
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100vh', overflowX: 'hidden' }}
    >
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages || 0), (el, index) => (
          <div
            key={`page_${index + 1}`}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderMode="canvas"
              renderTextLayer={false}
              width={containerWidth * 0.8} // Adjust the width based on the container width
            />
          </div>
        ))}
      </Document>
    </div>
  );
};

export default PdfViewer;


// const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
//   const [numPages, setNumPages] = useState<number | null>(null);
//   const [width, setWidth] = useState(window.innerWidth);
//   const [visiblePages, setVisiblePages] = useState<number[]>([]);

//   const handleResize = useCallback(() => {
//     setWidth(window.innerWidth);
//   }, []);

//   useEffect(() => {
//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [handleResize]);

//   const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
//     setNumPages(numPages);
//     setVisiblePages([1]); // Initially, only render the first page
//   }, []);

//   const handlePageVisible = useCallback((pageIndex: number) => {
//     setVisiblePages((prevVisiblePages) => {
//       if (!prevVisiblePages.includes(pageIndex)) {
//         return [...prevVisiblePages, pageIndex];
//       }
//       return prevVisiblePages;
//     });
//   }, []);

//   return (
//     <div>
//     <div style={{ width: '100%', height: '100vh', overflowX: 'hidden' }}>
//       <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
//         {visiblePages.map((pageIndex) => (
//           <div key={`page_${pageIndex}`} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <Page
//               key={pageIndex}
//               pageNumber={pageIndex}
//               renderMode="canvas"
//               renderTextLayer={false}
//               width={width * 0.8}
//               onRenderSuccess={() => handlePageVisible(pageIndex + 1)}
//             />
//           </div>
//         ))}
//       </Document>
//     </div>
//     </div>
//   );
// };

// export default React.memo(PdfViewer);
