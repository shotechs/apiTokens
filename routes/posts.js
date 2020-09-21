const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User");

router.post("/", verify, async (req, res) => {
  res.json({ posts: { title: "my first post", description: "message" } });
});

router.post("/user", verify, async (req, res) => {
  res.send(req.user);

  // get user from db
  // user = await User.findOne({ _id: req.user });
});

module.exports = router;
