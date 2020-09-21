const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  registerValidation,
  loginValidation,
} = require("../validation/validation");

router.post("/register", async (req, res) => {
  //LETS VALIDATE THE DATA BEFORE WE MAKE A USER

  const { error } = registerValidation(req.body);
  // // res.send(error.details[0].message);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //Checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("Email already exists");
  }

  //Hash passwords
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassowrd = await bcrypt.hash(req.body.password, salt);

  //Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassowrd,
  });
  try {
    const saveUser = await user.save();
    res.send({ user: user._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  //LETS VALIDATE THE DATA BEFORE WE Login

  const { error } = loginValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //Checking if the email is already in the database
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Email or password is wrong");
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send("Email or password is wrong");
  }

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
  // res.send("Logged in!");
});

module.exports = router;
