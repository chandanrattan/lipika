// === File: src/App.js ===
import React, { useState, useRef } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import "./App.css";

function App() {
  const [pdfData, setPdfData] = useState(null);
  const [pdfDocRef, setPdfDocRef] = useState(null);
  const [originalPdfBytes, setOriginalPdfBytes] = useState(null);
  const [status, setStatus] = useState("No PDF loaded");
  const [actionHistory, setActionHistory] = useState([]);
  const fileInputRef = useRef();
  const dropRef = useRef();

  const loadPdfFromFile = async (file) => {
    if (!file || file.type !== "application/pdf") return;
    setStatus("Loading PDF...");
    const arrayBuffer = await file.arrayBuffer();
    setOriginalPdfBytes(arrayBuffer);
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    setPdfDocRef(pdfDoc);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    firstPage.drawText("Watermarked by Lipika", {
      x: 50,
      y: 50,
      size: 14,
      color: rgb(0.5, 0.5, 0.5),
    });

    await updatePdfPreview(pdfDoc);
    setStatus("PDF Loaded and Edited");
    setActionHistory([
      { type: "load", description: "Initial load with watermark" },
    ]);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    loadPdfFromFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    loadPdfFromFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const clearPdf = () => {
    setPdfData(null);
    setPdfDocRef(null);
    setOriginalPdfBytes(null);
    setStatus("No PDF loaded");
    setActionHistory([]);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const addDummyHighlight = async () => {
    if (!pdfDocRef) return;
    const pages = pdfDocRef.getPages();
    const firstPage = pages[0];
    firstPage.drawRectangle({
      x: 45,
      y: 65,
      width: 180,
      height: 20,
      color: rgb(1, 1, 0),
      opacity: 0.5,
    });
    await updatePdfPreview(pdfDocRef);
    setStatus("Highlighted text area");
    pushAction({ type: "highlight", description: "Added highlight" });
  };

  const addDummySignature = async () => {
    if (!pdfDocRef) return;
    const pages = pdfDocRef.getPages();
    const firstPage = pages[0];
    firstPage.drawText("[Signature]", {
      x: 50,
      y: 30,
      size: 16,
      color: rgb(0.2, 0.2, 0.2),
    });
    await updatePdfPreview(pdfDocRef);
    setStatus("Added signature placeholder");
    pushAction({ type: "signature", description: "Added signature" });
  };

  const addDummyDrawing = async () => {
    if (!pdfDocRef) return;
    const pages = pdfDocRef.getPages();
    const firstPage = pages[0];
    firstPage.drawLine({
      start: { x: 50, y: 100 },
      end: { x: 150, y: 150 },
      thickness: 2,
      color: rgb(1, 0, 0),
    });
    await updatePdfPreview(pdfDocRef);
    setStatus("Drew a line");
    pushAction({ type: "drawing", description: "Drew a line" });
  };

  const pushAction = (action) => {
    setActionHistory((prev) => [...prev, action]);
  };

  const undoLastAction = async () => {
    if (actionHistory.length <= 1 || !originalPdfBytes) return;
    const newActions = actionHistory.slice(0, -1);
    const pdfDoc = await PDFDocument.load(originalPdfBytes);

    setPdfDocRef(pdfDoc);
    setActionHistory(newActions);
    setStatus("Undid last action (reset to original)");
    await updatePdfPreview(pdfDoc);
  };

  const updatePdfPreview = async (doc) => {
    if (!doc) return;
    const newPdf = await doc.save();
    const blob = new Blob([newPdf], { type: "application/pdf" });
    setPdfData(URL.createObjectURL(blob));
  };

  const saveEditedPdf = () => {
    if (!pdfData) return;
    const a = document.createElement("a");
    a.href = pdfData;
    a.download = "edited_lipika.pdf";
    a.click();
    setStatus("PDF saved");
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>📝 Lipika</h1>
        <p className="status">Status: {status}</p>
      </header>

      <div className="toolbar">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <button onClick={clearPdf}>Clear</button>
        <button onClick={addDummyHighlight}>Highlight</button>
        <button onClick={addDummySignature}>Add Signature</button>
        <button onClick={addDummyDrawing}>Draw</button>
        <button onClick={undoLastAction}>↩️ Undo</button>
        <button onClick={saveEditedPdf}>💾 Save PDF</button>
      </div>

      <div
        className="dropzone"
        ref={dropRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {pdfData ? (
          <div className="preview-container">
            <iframe
              src={pdfData}
              title="PDF Preview"
              width="100%"
              height="600px"
            ></iframe>
          </div>
        ) : (
          <div className="placeholder">
            <p>
              Drag and drop a PDF file here, or use the upload button above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
