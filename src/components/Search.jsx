import React, { useState } from "react";
import { searchTranscriptions } from "../api";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setMessage("Searching...");
    try {
      const response = await searchTranscriptions(query);
      setResults(response.results);
      setMessage("");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div style={styles.searchPage}>
      <h2 style={styles.header}>Search Transcriptions</h2>
      <p style={styles.description}>
        Quickly find relevant transcriptions from our extensive database. <br />
        Whether you're looking for specific keywords, phrases, or video titles, 
        our powerful search engine provides you with fast, accurate results.
      </p>
      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search query"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Search
        </button>
      </form>
      {message && <p>{message}</p>}
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
    </div>
  );
};

const styles = {
  searchPage: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
  },
  description: {
    textAlign: "left",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  resultItem: {
    padding: "15px",
    borderBottom: "1px solid #eee",
    backgroundColor: "#f9f9f9",
    color: "#333", // Dark text color for readability
  },
  
  input: {
    width: "100%",
    maxWidth: "400px",
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  inputFocus: {
    borderColor: "#9a55ff",
  },
  button: {
    padding: "10px 15px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #9a55ff",
    backgroundColor: "#9a55ff",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default Search;
