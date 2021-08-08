const express = require('express');
const router = express.Router();
//const user = require('../../User');

const User = require('../../model/User');



// Gets All Members
//router.get('/', (req, res) => res.json(user));

router.get('/', async (req, res) => {

    try {
        const Users = await User.find()
        res.json(Users)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
);

// Creating one
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


const jwt = require("jsonwebtoken");

const { userValidation } = require("../../validation/validation");

router.post("/userUpdate", async (req, res) => {
    //LETS VALIDATE user

    //Todo add error
    const { error } = userValidation(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //Checking if the email is already in the database
    const user = await User.findOne({ email: req.body.email });

    //no user found
    if (!user) {
        return res.status(400).send("Email or password is wrong");
    }




    //Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
    // res.send("Logged in!");
});

module.exports = router;


module.exports = router;
