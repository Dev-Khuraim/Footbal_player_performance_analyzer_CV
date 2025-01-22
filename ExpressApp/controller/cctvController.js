const CCTV = require("../model/CCTV");

async function updateCCTVVideos(req, res) {
  const email = req.params.email;
  const { videos } = req.body; // Expect an array of video objects (with url, title, description, etc.)

  console.log(email, videos);

  // Update the user's videos in the database
  const updatedCCTV = await CCTV.findOneAndUpdate(
    { userMail: email },
    { $set: { videos } },
    { new: true } // Option to return the updated document
  );

  if (!updatedCCTV) {
    return res.status(404).json({ message: "CCTV data not found" });
  }

  res.json(updatedCCTV);
}

module.exports = { updateCCTVVideos };
