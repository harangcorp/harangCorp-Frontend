import harangLogo from './assets/logo.svg';
import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';
import useWindowSize from "./windowSize";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function App() {
  const windowSize = useWindowSize();
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  return (
    <div>
      <Document file="/src/assets/harang.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (_, index) => (
          <Page
            width={windowSize.width}
            height={windowSize.height}
            key={index}
            pageNumber={index + 1}
            renderAnnotationLayer={false}
          />
        ))}
      </Document>
    </div>
  );
}

export default App;
