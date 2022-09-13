import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';
import ReactGA from 'react-ga';
import RouteChangeTracker from './components/RouteChangeTracker';
import useWindowSize from "./windowSize";
import harangPdf from '@/assets/harang.pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function App() {
  const windowSize = useWindowSize();
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const TRACKING_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_TRACKING_ID; // 발급받은 추적ID를 환경 변수로 불러온다.
  ReactGA.initialize(TRACKING_ID);
  RouteChangeTracker();

  return (
    <div>
      <Document file={harangPdf} onLoadSuccess={onDocumentLoadSuccess}>
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
