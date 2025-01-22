const User = require("../model/User");
const Admin = require("../model/Admin");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserProfile = require("../model/UserProfile")


async function login(req, res) {
  const { email, password } = req.body;
  
console.log(email)
  if (!email || !password) {
    res.status(400).json({ message: "Email and password is required" });
    return;
  }

  // Find the user by email
  const user = await UserProfile.findOne({email }).exec();
 
  const payload = {
    id: user._id,
    email: user.email,
  };

  // Generate a JWT token
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' }); // Token expires in 1 hour

  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch)
  // Check if the user exists and the password matches
  if (isMatch) {
    res.status(200).json({ message: 'Authentication successful', token });
  } else {
    res.status(401).json({ message: "Login failed" });
  }
}

module.exports = { login };
