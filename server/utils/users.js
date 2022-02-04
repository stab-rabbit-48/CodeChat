const jwt = require('jsonwebtoken');
require('dotenv').config();

// returns a signed jwt access token given a username
const generateAccessToken = (username) => {
  console.log('inside generateAccessToken');
  return jwt.sign({data: username}, process.env.JWT_SECRET, { expiresIn: '1800s'});
}

module.exports = { generateAccessToken }