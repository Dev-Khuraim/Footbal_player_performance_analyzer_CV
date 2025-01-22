const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserProfileSchema = new Schema(
  {
    f_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    videos: [
      {
        date: {
          type: Date,
          default: Date.now,
        },
        url: {
          type: String,
          required: true,
        }
      }
    ],
   
  },
  { collection: "Profiles" }
);
module.exports = mongoose.model("UserProfile", UserProfileSchema);
