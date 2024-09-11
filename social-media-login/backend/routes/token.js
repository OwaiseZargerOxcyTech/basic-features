require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const generateToken = (id, type) => {
  const payload = {
    id,
    type,
  };
  const token = jwt.sign(payload, secretKey, { expiresIn: "90d" });
  return token;
};

// Export both the token generator and the router
module.exports = generateToken;
