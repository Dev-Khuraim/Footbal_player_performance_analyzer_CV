const express = require("express");
const router = express.Router();
const userProfileController = require("../controller/userProfileController");
const authController = require("../controller/authController");


// routes
// router.post("/", userProfileController.getUserDetails);
router.get("/", userProfileController.getAllUserDetails);
// router.delete("/:email/videos/:videoUrl", userProfileController.deleteUserVideo);
router.post("/", userProfileController.createUser);
router.post("/user/remove", userProfileController.removeUser);
router.get("/:email", userProfileController.getAllUserVideos);
module.exports = router;
