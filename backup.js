// Telegram Bot Creation Process 

//This Node.js script allows you to send messages and photos to a Telegram channel using the Telegram Bot API. 
//It utilizes Express.js to create a RESTful API and provides endpoints to send text messages and images.

// Send a text message to a Telegram channel.
// Send an image from the server's local storage to a Telegram channel.
// Simple API with JSON responses.

//Telegram Bot API Token
//A Telegram Channel or Group where the bot has admin rights


// Setting Up the Telegram Bot

// Create a Bot on Telegram
// Open Telegram and search for BotFather.
// Start a chat and use the command /newbot.
// Follow the instructions to name your bot and get a unique username.
// You will receive an API token. Save this token securely. in .env file like this TOKEN="bot7472830421:AAHHDe69BfG4b8Or4oj1Fi_w_ZIIPsAgd7g"
// Add the Bot to a Group or Channel
// Create or open a Telegram Group/Channel.
// Add your bot as a member.
// Promote it to an admin to allow it to send messages.
// Get the Chat ID of Your Group/Channel and store in .env file with name CHANNEL like this CHANNEL="-1002172290139"
// The bot will return an ID starting with -100, which is your chat ID  
// ex. CHANNEL="-1002172290139".


// import "dotenv/config";
// import express from "express";
// import fs from "fs";
// import path from "path";
// import fetch from "node-fetch";
// import FormData from "form-data";

// const app = express();
// const PORT = process.env.PORT || 3000;
// app.use(express.json());

// app.get("/send-message", async (req, res) => {
//   let message = "🚀 Message sended by auto program 123  !";
//   if (!message) {
//     return res.status(400).json({ error: "Message text is required." });
//   }

//   try {
//     const response = await fetch(
//       `https://api.telegram.org/${process.env.TOKEN}/sendMessage`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           chat_id: process.env.CHANNEL,
//           text: message,
//         }),
//       }
//     );
//     const result = await response.json();
//     res.json(result);
//   } catch (error) {
//     console.error("Error sending message:", error);
//     res.status(500).json({ error: "Failed to send message." });
//   }
// });

// app.get("/send-photo", async (req, res) => {
//     const filename = "one.png"; 
//     const imagePath = path.join(process.cwd(), "image", filename);  
//     if (!fs.existsSync(imagePath)) {
//       console.error("Image not found:", imagePath);
//       return res.status(404).json({ error: "Image not found." });
//     }
//     try {
//       const formData = new FormData();
//       formData.append("chat_id", process.env.CHANNEL);
//       formData.append("caption", "Here is an image from the from auto program !");
//       formData.append("photo", fs.createReadStream(imagePath));
  
//       const response = await fetch(
//         `https://api.telegram.org/${process.env.TOKEN}/sendPhoto`,
//         {
//           method: "POST",
//           body: formData,
//           headers: formData.getHeaders(),
//         }
//       );
//       const result = await response.json();
//       console.log("Telegram Response:", result);
//       res.json(result);
//     } catch (error) {
//       console.error("Error sending photo:", error);
//       res.status(500).json({ error: "Failed to send photo." });
//     }
//   });
// app.get("/", (req, res) => {
//   res.json({ message: "Server is running!" });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });




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



// # BOT_TOKEN=7472830421:AAHHDe69BfG4b8Or4oj1Fi_w_ZIIPsAgd7g
// # CHAT_ID=mytestgtoup
// # MESSAGE_ID=your_image_message_id
// PORT=4000

// # api_id=22740862
// # has_id=0e5a1c1fad7b5f6530d642c00437945c
// # groupchatid=https://t.me/mytestgtoup;

    
// # api_id=7472830421:AAHHDe69BfG4b8Or4oj1Fi_w_ZIIPsAgd7g


// # API_ID=22740862
// # API_HASH=7472830421:AAHHDe69BfG4b8Or4oj1Fi_w_ZIIPsAgd7g
// # PHONE_NUMBER=8171726983
// # CHAT_ID=/mytestgtoup
// # IMAGE_PATH=./image/one.png

// CHANNELforch="-1002307629222"
// CHANNELgroupbot="-1002381246833"
// # CHANNEL="-4609270911"
// TOKEN="bot7472830421:AAHHDe69BfG4b8Or4oj1Fi_w_ZIIPsAgd7g"
// # CHANNEL="-1002172290139"
// CHANNEL="-1002172290139"
// CHANNELlink='https://t.me/skillotto'

