const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    let authToken = req.headers.authorization;

    console.log("Authorization:", req.headers.authorization);
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

const adminMiddleware = async (req, res, next) => {
  try {
    let adminToken = req.headers.authorization;

    if (!adminToken) {
      return res.status(401).send("Unauthorised Access");
    }
    adminToken = adminToken.split(" ")[1];
    const decoded = jwt.verify(adminToken, JWT_SECRET);
    req.adminId = decoded.adminId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send("Invalid Token");
  }
};
module.exports = { authMiddleware, adminMiddleware };
