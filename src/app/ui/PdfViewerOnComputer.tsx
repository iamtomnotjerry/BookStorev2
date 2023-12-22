import React from 'react';

interface PdfViewerOnComputerProps {
  pdfUrl: string;
}

const PdfViewerOnComputer: React.FC<PdfViewerOnComputerProps> = ({ pdfUrl }) => {
  return (
    <div className="w-full h-screen overflow-hidden">
      <iframe
        src={pdfUrl}
        className="w-full h-full"
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default PdfViewerOnComputer;
