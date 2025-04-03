// Import environment variables from .env file
import "dotenv/config";

// Import the Express framework to create a server
import express from "express";

// Import Node.js built-in modules for file system operations and path management
import fs from "fs";
import path from "path";

// Import fetch for making HTTP requests
import fetch from "node-fetch";

// Import FormData to send multipart form data (e.g., for file uploads)
import FormData from "form-data";

// Create an Express application
const app = express();

// Set the server port, defaulting to 3000 if not provided in environment variables
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

/**
 * Route: GET /send-message
 * Description: Sends a text message to a Telegram channel via the Telegram Bot API
 */
app.get("/send-message", async (req, res) => {
  // Define the message to be sent
  let message = "🚀 Message sended by auto program 123  !";

  // Check if message is empty (though in this case, it's hardcoded)
  if (!message) {
    return res.status(400).json({ error: "Message text is required." });
  }

  try {
    // Send a POST request to the Telegram API to send the message
    const response = await fetch(
      `https://api.telegram.org/${process.env.TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.CHANNEL, // Telegram channel ID from environment variables
          text: message, // Message content
        }),
      }
    );

    // Parse the JSON response from Telegram
    const result = await response.json();

    // Send the response back to the client
    res.json(result);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message." });
  }
});

/**
 * Route: GET /send-photo
 * Description: Sends an image to a Telegram channel via the Telegram Bot API
 */
app.get("/send-photo", async (req, res) => {
  // Define the image filename
  const filename = "one.png";

  // Construct the full path to the image file
  const imagePath = path.join(process.cwd(), "image", filename);

  // Check if the image file exists
  if (!fs.existsSync(imagePath)) {
    console.error("Image not found:", imagePath);
    return res.status(404).json({ error: "Image not found." });
  }

  try {
    // Create a FormData object to send the image file
    const formData = new FormData();
    formData.append("chat_id", process.env.CHANNEL); // Add the Telegram channel ID
    formData.append("caption", "Here is an image from the auto program!"); // Set the caption for the image
    formData.append("photo", fs.createReadStream(imagePath)); // Attach the image file

    // Send a POST request to the Telegram API to send the photo
    const response = await fetch(
      `https://api.telegram.org/${process.env.TOKEN}/sendPhoto`,
      {
        method: "POST",
        body: formData,
        headers: formData.getHeaders(), // Set the correct headers for multipart/form-data
      }
    );

    // Parse the JSON response from Telegram
    const result = await response.json();
    console.log("Telegram Response:", result);

    // Send the response back to the client
    res.json(result);
  } catch (error) {
    console.error("Error sending photo:", error);
    res.status(500).json({ error: "Failed to send photo." });
  }
});

/**
 * Route: GET /
 * Description: A simple health check endpoint to confirm that the server is running
 */
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Start the Express server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
