
const express = require("express");
const router = express.Router();
const multer = require("multer");
const jwt = require('jsonwebtoken');
const {uploadUserVideo} = require("../controller/userProfileController")

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./videos");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "." + file.originalname.split(".").pop());
  },
});

const upload = multer({ storage: storage });
router.post('/', upload.single('video'), async (req, res) => {
    // Extract the token from the Authorization header
  
  try{

      const token = req.headers.authorization?.split(' ')[1];
      
      console.log(req.file)
      
      if (!token) {
        return res.status(401).json({ message: 'Authentication token missing' });
      }
   
      // Verify and decode the token to get the user's email
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret
      console.log(decoded)
      const userEmail = decoded.email;
     
     const videoFile = req.file;
   
     if (!videoFile) {
         return res.status(400).json({ message: 'No video file uploaded' });
     }
   
     // Call the separate function to handle the video upload
     const result = await uploadUserVideo(userEmail, videoFile);
     console.log(result)
   
     if (result.success) {
         res.status(200).json({ message: 'Video uploaded successfully', videos: result.videos });
     } else {
         res.status(500).json({ message: result.message });
     }
   }


   catch(error){
     console.log(error)
     res.status(500).json({ message: 'Internal server error' });
   }
});
  


 module.exports = router;