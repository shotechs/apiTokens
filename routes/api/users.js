const express = require("express");
const router = express.Router();
const User = require("../../model/User");
const verify = require("../verifyToken");
// Gets All Members
//router.get('/', (req, res) => res.json(user));

// router.get('/', async (req, res) => {

//     try {
//         const Users = await User.find()
//         res.json(Users)
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// }
// );

// Creating one
// router.post('/', async (req, res) => {
//     const user = new User({
//         name: req.body.name,
//         subscribedToChannel: req.body.subscribedToChannel
//     })
//     try {
//         const newUser = await user.save()
//         res.status(201).json(newUser)
//     } catch (err) {
//         res.status(400).json({ message: err.message })
//     }
// })

const jwt = require("jsonwebtoken");

const {
  userValidation,
  addCashValidation,
} = require("../../validation/validation");

//profile update
router.patch("/userUpdate", verify, async (req, res) => {
  //LETS VALIDATE user
  //console.log("req1", req.body);
  //Todo add error
  const { error } = userValidation(req.body);
  //console.log("req2", req.body);
  if (error) {
    //console.log("error", error);
    //return res.status(400).send(error.details[0].message);

    msg = { auth: false, msg: error.details[0].message };
    return res.status(400).json(msg);
  }

  //Checking if the email is already in the database
  const user = await User.findOne({ email: req.body.email });
  //console.log("user3", user);
  //no user found
  if (!user) {
    msg = { auth: false, msg: "Error: Email is wrong" };
    return res.status(400).json(msg);
  } else {
    //console.log("body", req.body);
    //user update
    user.username = req.body.username;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.moneyType = req.body.moneyType;
    user.address_line_1 = req.body.address_line_1;
    user.address_line_2 = req.body.address_line_2;
    user.city = req.body.city;
    user.state = req.body.state;
    user.zip_code = req.body.zip_code;
    user.bio = req.body.bio;
    user.user_image = req.body.user_image;

    try {
      const saveUser = await user.save();
      //Create and assign a token
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      // res.header("auth-token", token).send(token);
      // res.send("Logged in!");
      res
        .header("auth-token", token)
        .json({ auth: true, token: token, user: saveUser });

      console.log("user", user);
    } catch (error) {
      const msg = { msg: "Error:" + error };
      return res.status(400).json(msg);
    }
  }
});

// Cash update
router.post("/cashAdd", async (req, res) => {
  const { error } = addCashValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //Checking if the email is already in the database
  let user = await User.findOne({ email: req.body.email });

  //no user found
  if (!user) {
    return res.status(400).send("Email or password is wrong");
  }

  // if user set cash
  // +10
  user.cash = user.cash + req.body.cash;

  try {
    const saveUser = await user.save();
    //get token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: 300,
    });
    res
      .header("auth-token", token)
      .json({ auth: true, token: token, user: saveUser });
  } catch (error) {
    const msg = { msg: "Error:" + error };
    return res.status(400).json(msg);
  }
});
module.exports = router;
