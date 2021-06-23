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



module.exports = router;
