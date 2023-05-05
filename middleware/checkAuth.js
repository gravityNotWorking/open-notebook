const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({
      succes: false,
      message: "Unauthorized!",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const { username } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = username;
    next();
  } catch (error) {
    res.status(401).json({ succes: false, message: error.message });
  }
};
module.exports = verifyToken;
