const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const mongoose = require("mongoose");
const verify = require("../verifyToken");

const Game = require("../../model/Game");
const User = require("../../model/User");
let saveUser;
//const user_Id = "6096b0f6b45393b6a8e85224"

//const { gameValidation } = require("../../validation/validation");

function GameOver() {
  //go to pay more page b/c cash is out
  console.log("cash at 0 for " + playingGame.user_id);
  //User.cash = 500;
}

// router.post('/', async (req, res) => {

// 	try {
// 		//const Games = await Game.find()
// 		//res.json(Games)
// 		game = await Game.findOne({ user_id: req.body.user_id, _id: req.body._id }).exec();

// 		if (game) {
// 			res.json(game)
// 		} else {
// 			throw new Error("Didn't find game")
// 			//  res.status(404).json({ message: "Didn't find game" })
// 		}

// 	} catch (err) {
// 		res.status(500).json({ message: err.message })
// 	}
// }
// );

async function getGame(req, res, next) {
  let game;
  try {
    game = await Game.findOne({
      user_id: req.body.user_id,
      _id: req.body._id,
    }).exec();
    if (game === null) {
      return res.status(404).json({ message: "Cannot find game" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.game = game;
  next();
}

deal = require("./deal");
router.post("/deal", verify, deal.deal);

playerhit = require("./playerhit");
router.patch("/playerhit", verify, getGame, playerhit.playerhit);

module.exports = router;
