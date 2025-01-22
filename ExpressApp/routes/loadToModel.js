const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch'); // HTTP client library
const FormData = require('form-data'); // Import form-data package
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
ffmpeg.setFfmpegPath(ffmpegPath)
router.post('/:videoUrl', async (req, res) => {
  try {
    // Get the current directory
    const currentDirectory = __dirname;
    console.log('Current Directory:', currentDirectory);

    // Get the parent directory
    const parentDirectory = path.dirname(currentDirectory);
    console.log('Parent Directory:', parentDirectory);

    const { videoUrl } = req.params;
    console.log('Video URL:', videoUrl);

    // Construct the file path
    const filePath = path.join(parentDirectory, "videos", videoUrl);
    console.log('File path:', filePath);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      console.error('File does not exist:', filePath);
      return res.status(404).json({ error: 'File not found' });
    }

    console.log('Video successfully converted to .avi:', filePath);


    // Create a read stream of the file
    const fileStream = fs.createReadStream(filePath);

    // Create a FormData object and append the file
    const formData = new FormData();
    formData.append('video', fileStream, path.basename(videoUrl));
    const ngrok = "https://68e5-35-201-140-245.ngrok-free.app"
    // Send the form data to the Flask backend
    const response = await fetch(`${ngrok}/upload`, {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders(), // Important: set the headers
    });

    // Check if the response is OK
    if (!response.ok) {
      const errorData = await response.text();
      console.log("things under bad response")
      console.error('Error from Flask backend:', errorData);
      return res.status(response.status).json({ error: errorData });
    }

    const data = await response.json();
    console.log('Upload successful:', data);
    res.status(200).json(data);
    // console.log(res.json(data))
  } catch (error) {
    console.error('Error uploading the file:', error);
    res.status(500).json({ error: 'Error uploading the file' });
  }
});

module.exports = router;
