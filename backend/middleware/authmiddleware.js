const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    let token = req.header("Authorization");
    if (!token || !token.startsWith("Bearer")) {
      return res.status(401).send("Access Denied . No Token Provided");
    }
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).send("Invalid or Expired Token");
  }
};
