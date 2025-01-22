const { mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const CCTVSchema = new Schema(
  {
    userMail: {
      type: String,
      required: true,
    },
    videos: [
      {
        url: {
          type: String,
          required: true, // URL or path to the video file
        },
        
        uploadedAt: {
          type: Date,
          default: Date.now, // Timestamp of when the video was uploaded
        },
      },
    ], // Array of videos uploaded by the user
  },
  { collection: "Cctvs" }
);

module.exports = mongoose.model("CCTV", CCTVSchema);
