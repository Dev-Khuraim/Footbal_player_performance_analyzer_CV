const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userMail: {
      type: String,
      required: true,
      unique: true,
    lowercase: true,
    trim: true,
    },
    userPassword: {
      type: String,
      required: true,
    },
  },
  // { collection: "Users" }
);

const User =  mongoose.model("User", userSchema);

module.exports = User;