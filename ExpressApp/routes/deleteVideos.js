const express = require("express");
const router = express.Router();
const userProfileController = require("../controller/userProfileController");

router.delete("/:email/videos/:videoId", userProfileController.deleteUserVideo);
module.exports = router;