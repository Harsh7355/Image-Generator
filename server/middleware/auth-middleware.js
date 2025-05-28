const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');

  console.log("Raw Authorization Header:", token);

  if (!token) {
    return res.status(400).send({ msg: "Token not provided" });
  }

  try {
    const jwttoken = token.replace("Bearer ", "");
    console.log("Extracted Token:", jwttoken);

    const isverified = jwt.verify(jwttoken, process.env.SECRET_KEY);
    console.log("Verified Payload:", isverified);

    const userdata = await User.findOne({ email: isverified.email }).select({ password: 0 });

    if (!userdata) {
      return res.status(401).send({ msg: "User not found in DB" });
    }

    req.user = userdata;
    req.token = token;
    req._userId = userdata._id;

    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(400).send({ msg: "Invalid token" });
  }
};

module.exports = authMiddleware;
