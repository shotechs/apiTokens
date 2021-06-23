const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");

  const msg = { msg: "Access Denied no Token" }
  if (!token) return res.status(401).json(msg);

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          const msg = { msg: "Access Denied Verify" }
          res.status(400).json(msg);
        } else {
          req.userId = decoded.id;
        }

      });
    req.user = verified;
    next();
  } catch (error) {
    const msg = { msg: "Invalid Token" }
    res.status(400).json(msg);
  }
};