// server.js
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/databaseConnection"); // Ensure this path is correct
const cors = require("cors");
const mongoose = require("mongoose");


// create express app
const app = express();

app.use(cors({
  origin: '*', // Allow all origins (for development only)
}));
app.options('*', cors()); // Enable CORS for preflight requests

// Connect to the database and start the server
async function startServer() {
  try {
    await connectDB(); // Wait for the database connection to be established
    console.log("Connected to MongoDB");

    // Middleware
    const corsOptions = {
      origin: ['http://localhost:3000', 'http://localhost:5173'], // Add your allowed origins here
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
      credentials: true // Enable this if your frontend sends cookies or needs credentials
    };
    
    app.use(cors(corsOptions));
    
    app.use("/videos", express.static("videos"));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    
    // Routes
    app.use("/login", require("./routes/auth"));
    app.use("/signup", require("./routes/userProfile"))
    // app.use("/getProfileDetails", require("./routes/userProfile"));
    app.use('/videos', require('./routes/loadToModel'))
    app.use("/videos", require("./routes/userProfile"))
    app.use("users", require("./routes/deleteVideos"))
    app.use("/uploadVideo", require("./routes/videoUpload"))

    // app.use("/uploadVideo", require("./routes/videoFIleUpload")); // This line uses the videoUpload route
    // app.use("/stream", require("./routes/fetchVideos"))
    // app.use("/updateCCTVIps", require("./routes/cctv"));

    // Start the server
    const PORT = process.env.PORT || 3000;
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
  }
}

startServer();
