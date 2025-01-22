const fs = require("fs");
const bcrypt = require('bcrypt');
const CCTV = require("../model/CCTV");
const UserProfile = require("../model/UserProfile");
const connectDB = require("../config/databaseConnection");
const User = require("../model/User");
const Admin = require("../model/Admin");
const Videos = require("../model/Video");
const path = require('path');
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");


async function getUserDetails(req, res) {
  const _userMail = req.body.userMail;
  

  // if (isAdmin) {
  //   const adminProfile = await Admin.findOne({
  //     adminMail: _userMail,
  //   }).exec();
  //   res.json({
  //     fullName: adminProfile.adminName,
  //     city: adminProfile.adminCity,
  //     email: adminProfile.adminMail,
  //   });
  //   return;
  // }

  const userProfile = await UserProfile.findOne({
    userMail: _userMail,
  }).exec();
  const cctvData = await CCTV.findOne({ userMail: _userMail });

  if (!userProfile) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    userProfile,
    cctvData,
  });
}

async function getAllUserDetails(req, res) {
  try {
    // Fetch all user profiles
    const userProfiles = await UserProfile.find().exec();

    // Fetch CCTV data for each user
    const userDetails = await Promise.all(
      userProfiles.map(async (profile) => {
        const cctvData = await CCTV.findOne({
          userMail: profile.userMail,
        }).exec();
        return {
          name: profile.userName,
          
          email: profile.userMail,
          password: "*********",
          cctvIp: cctvData.ips || {}, // Provide an empty object if CCTV data is not found
        };
      })
    );

    res.json(userDetails);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
async function createUser(req, res) {
  try {
    const { f_name, email, password, videos } = req.body;
   
    // Check if the user already exists
    const existingUser = await UserProfile.findOne({ email }).exec();
   
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
// Hash the password
const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user profile
    const userProfile = new UserProfile({
      f_name,
      email,
      password: hashedPassword,
      videos: [] // No videos initially
    });
    await userProfile.save();

   

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error"});
  }
}
async function uploadUserVideo(email, videoFile) {
  try {
      // Find the user by email
      console.log(email)
      const user = await UserProfile.findOne({ email}).exec();
      console.log(user)
      if (!user) {
          throw new Error('User not found');
      }

      // Construct the video URL (local file path in this case)
      const videoUrl = path.join('videos', videoFile.filename);
      console.log(videoUrl)

      // Add the new video to the user's videos array
      const newVideo = {
         
          date: new Date(),
        
          url: videoUrl
      };
      console.log(newVideo)
      user.videos.push(newVideo);

      // Save the updated user information with the new video
      await user.save();
      return { success: true, videos: user.videos };
  } catch (error) {
      return { success: false, message: error.message };
  }
}
// Assuming your backend is using Express.js
async function deleteUserVideo(req, res) {
  const { email, videoId } = req.params;
  console.log(email, videoId)

  try {
    // Find the user by email
    const user = await UserProfile.findOne({ email }).exec();
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Find the index of the video by videoId and remove it
    const videoIndex = user.videos.findIndex(video => video._id.toString() === videoId);
    if (videoIndex === -1) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    user.videos.splice(videoIndex, 1); // Remove the video from the array

    // Save the updated user document
    await user.save();

    return res.json({ success: true, message: 'Video deleted successfully', videos: user.videos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to delete video' });
  }
};


async function removeUser(req, res) {
  try {
    const userMail = req.body.userMail;
    console.log(userMail);
    // Remove user profile
    await UserProfile.deleteMany({ userMail }).exec();

    // Remove CCTV data
    await CCTV.deleteMany({ userMail }).exec();

    // Remove user from Users collection
    await User.deleteMany({ userMail }).exec();

    res.status(200).json({ message: "User data removed successfully" });
  } catch (error) {
    console.error("Error removing user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}




async function getAllUserVideos(req, res) {
  const { email } = req.params;
  try {
   
    // Find videos for the specified user
    const user = await UserProfile.findOne({ email }).exec();

    // Check if user videos exist
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Retrieve both video IDs and URLs from the videos array
    console.log(user.videos)
    const videosWithIds = user.videos.map(video => ({
      id: video._id,          // Assuming each video has a unique _id
      url: video.url          // Assuming each video object has a 'url' field
    }));
    console.log(videosWithIds)
    // Return the list of video URLs
    res.status(200).json( videosWithIds );
  } catch (error) {
    console.error("Error fetching user videos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


module.exports = {
  deleteUserVideo,
  getUserDetails,
  getAllUserDetails,
  createUser,
  removeUser,
  uploadUserVideo,
 
  getAllUserVideos,
};
