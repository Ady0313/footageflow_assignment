// frontend/src/api.js
const API_URL = "http://127.0.0.1:5000"; // Update if hosted elsewhere

// Function to upload a file
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/transcribe`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to upload file");
  }

  return response.json(); // Returns the response after successful file upload and transcription
};

// Function to search through transcriptions
export const searchTranscriptions = async (query) => {
  const response = await fetch(`${API_URL}/search_transcriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to search transcriptions");
  }

  return response.json(); // Returns the search results
};

// Function to generate a story based on user prompt
export const generateStory = async (prompt) => {
  const response = await fetch(`${API_URL}/api/generate_story`, {  // Corrected the URL
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to generate story");
  }

  return response.json(); // Returns the generated story
};
