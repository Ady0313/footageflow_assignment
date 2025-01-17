import React, { useState } from "react";
import { generateStory } from "../api"; // Assuming you have this function in api.js

const StoryGenerator = () => {
  const [storyDetails, setStoryDetails] = useState("");
  const [generatedStory, setGeneratedStory] = useState("");
  const [message, setMessage] = useState("");

  const handleGenerateStory = async () => {
    if (storyDetails.trim()) {
      setMessage("Generating story...");
      try {
        const response = await generateStory(storyDetails);  // API call to generate the story
        setGeneratedStory(response.story);  // Set the generated story from backend response
        setMessage("");  // Clear the loading message
      } catch (error) {
        setMessage(`Error: ${error.message}`);  // Handle any errors
      }
    } else {
      setMessage("Please enter some details to generate a story.");
    }
  };

  return (
    <div className="story-generator-page">
      <h2>Generate Your Story</h2>
      <p>
        Create unique and captivating stories in just a few clicks. 
        Simply provide the details or theme you'd like your story to be based on, 
        and let our intelligent algorithm craft a narrative for you.
      </p>
      <textarea
        placeholder="Enter your story details here..."
        value={storyDetails}
        onChange={(e) => setStoryDetails(e.target.value)}  // Update input value
      ></textarea>
      <button onClick={handleGenerateStory}>Generate Story</button>
      {message && <p>{message}</p>}  {/* Show loading or error message */}
      {generatedStory && (
        <div className="generated-story">
          <h3>Your Generated Story:</h3>
          <p>{generatedStory}</p>  {/* Display the generated story */}
        </div>
      )}
    </div>
  );
};

export default StoryGenerator;
