import React, { useState } from "react";
import { uploadFile, searchTranscriptions } from "../api";

const Transcription = () => {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [uploadMessage, setUploadMessage] = useState("");
  const [searchMessage, setSearchMessage] = useState("");
  const [results, setResults] = useState([]);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadMessage("Please select a file.");
      return;
    }

    setUploadMessage("Uploading...");
    try {
      const response = await uploadFile(file);

      // Assuming the response has a 'text' field directly instead of 'transcription'
      if (response && response.text) {
        setUploadMessage(`Transcription completed: ${response.text}`);
      } else {
        setUploadMessage("Transcription failed. No text found.");
      }
    } catch (error) {
      setUploadMessage(`Error: ${error.message}`);
    }
  };

  // Handle transcription search
  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchMessage("Searching...");
    try {
      const response = await searchTranscriptions(query);
      setResults(response.results);
      setSearchMessage("");
    } catch (error) {
      setSearchMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Transcription Service</h1>

      <section>
        <h2>Upload File for Transcription</h2>
        <form onSubmit={handleUpload}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
        {uploadMessage && <p>{uploadMessage}</p>}
      </section>

      <section>
        <h2>Search Transcriptions</h2>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter search query"
          />
          <button type="submit">Search</button>
        </form>
        {searchMessage && <p>{searchMessage}</p>}
        {results.length > 0 && (
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                <strong>File:</strong> {result.file}
                <br />
                <strong>Text:</strong> {result.text}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Transcription;
