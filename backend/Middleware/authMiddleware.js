const jwt = require("jsonwebtoken");

const JWT_SECRET = "Knight*58410";

const authMiddleware = async (req, res, next) => {
  try {
    let authToken = req.headers.authorization;

    if (!authToken) {
      return res.status(401).send("Unauthorized Access");
    }

    authToken = authToken.split(" ")[1];

    const decoded = jwt.verify(authToken, JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send("Invalid Token");
  }
};

module.exports = authMiddleware;