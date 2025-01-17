// src/pages/StoryGeneratorPage.js
import React, { useState } from "react";
import { generateStory } from "../api"; // Ensure this is correct

const StoryGeneratorPage = () => {
  const [prompt, setPrompt] = useState("");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateStory = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await generateStory(prompt);
      setStory(result.story);
    } catch (err) {
      setError("Failed to generate story.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
  <h2>Generate Your Story</h2>
      <p>
        Create unique and captivating stories in just a few clicks. 
        Simply provide the details or theme you'd like your story to be based on, 
        and let our intelligent algorithm craft a narrative for you.
      </p>      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt"
      />
      <button onClick={handleGenerateStory} disabled={loading}>
        {loading ? "Generating..." : "Generate Story"}
      </button>
      {error && <p>{error}</p>}
      {story && <div><h2>Generated Story:</h2><p>{story}</p></div>}
    </div>
  );
};

export default StoryGeneratorPage;
