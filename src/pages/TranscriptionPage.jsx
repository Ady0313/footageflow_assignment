import React, { useState } from "react";
import { uploadFile } from "../api";

const TranscriptionPage = () => {
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const allowedExtensions = ["mp4", "mkv", "avi", "mov"];
    const fileExtension = selectedFile?.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      alert("Invalid file type. Please upload a video file (.mp4, .mkv, .avi, .mov).");
      setFile(null);
    } else {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      setUploadMessage("Uploading...");
      try {
        const response = await uploadFile(file);
        setUploadMessage(`File uploaded successfully. Transcription: "${response.transcription_text}"`);
      } catch (error) {
        setUploadMessage(`Error: ${error.message || "Unexpected error occurred."}`);
      }
    } else {
      setUploadMessage("No file selected.");
    }
  };

  return (
    <div style={styles.transcriptionPageContainer}>
      <div style={styles.welcomeSection}>
        <h1 style={styles.header}>Welcome to the AI-Powered Video Platform</h1>
        <p style={styles.description}>
          View, edit, and manage your transcriptions with ease.
        </p>
      </div>

      <div style={styles.transcriptionPage}>
        <h2 style={styles.header}>Upload File for Transcription</h2>
        <form onSubmit={handleSubmit} style={styles.transcriptionForm}>
          <input
            type="file"
            onChange={handleFileChange}
            required
            style={styles.fileInput}
          />
          <button type="submit" style={styles.submitBtn}>
            Upload
          </button>
        </form>
        {uploadMessage && <p style={styles.message}>{uploadMessage}</p>}
      </div>
    </div>
  );
};

const styles = {
  transcriptionPageContainer: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  welcomeSection: {
    marginBottom: "20px",
  },
  header: {
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: "20px",
  },
  transcriptionPage: {
    marginTop: "40px",
  },
  transcriptionForm: {
    display: "flex",
    flexDirection: "column", // Stacks items vertically for responsiveness
    gap: "15px",
    alignItems: "center", // Center-align form inputs
  },
  fileInput: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    width: "100%",
    maxWidth: "400px",
  },
  submitBtn: {
    padding: "10px 15px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #9a55ff",
    backgroundColor: "#9a55ff",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  message: {
    textAlign: "center",
    marginTop: "15px",
  },
};

export default TranscriptionPage;
