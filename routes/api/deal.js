let cards = require("./cards");
let cash = require("./cash");
const Game = require("../../model/Game");
let { gameValidation } = require("../../validation/validation");

function dealCards(id, bet) {
  let user_id = id;
  let playerCard1_txt = cards.getCard();
  let playerCard2_txt = cards.getCard();
  let dealerCard3_txt = cards.getCard();
  let dealerCard4_txt = cards.getCard();

  //custom value
  // playerCard1_txt = "s4";
  // playerCard2_txt = "sj";

  // dealerCard3_txt = "sj";
  // dealerCard4_txt = "ca";

  let playerCard1_val_txt = playerCard1_txt.substring(1, 3);
  let playerCard2_val_txt = playerCard2_txt.substring(1, 3);
  let dealerCard3_val_txt = dealerCard3_txt.substring(1, 3);
  let dealerCard4_val_txt = dealerCard4_txt.substring(1, 3);

  //play cards in file names
  let playerCard1 = playerCard1_txt + ".png";
  let playerCard2 = playerCard2_txt + ".png";
  let dealerCard3 = dealerCard3_txt + ".png";
  let dealerCard4 = dealerCard4_txt + ".png";

  //val to int
  let playerCard1_val = parseInt(cards.cardnumber1(playerCard1_val_txt));
  let playerCard2_val = parseInt(cards.cardnumber1(playerCard2_val_txt));
  let dealerCard3_val = parseInt(cards.cardnumber1(dealerCard3_val_txt));
  let dealerCard4_val = parseInt(cards.cardnumber1(dealerCard4_val_txt));

  let game_status = "Playing";
  let dd = false;
  let player_status = true;
  let dealer_status = false;
  let split = false;
  let hit = 2;
  let draw = false;
  let p1HasAce = false;
  let deHasAce = false;

  //   //show double 2 cards are same
  if (playerCard1_val_txt === playerCard2_val_txt) {
    //split is true
    split = true;
  }
  //  ace check
  if (playerCard1_val == 11) {
    p1HasAce = true;
    //1st card not a 10
    playerCard1_val = cards.aceCheck(playerCard2_val);
  }
  if (playerCard2_val == 11) {
    p1HasAce = true;
    //2nd card not a 10
    playerCard2_val = cards.aceCheck(playerCard1_val);
  }

  if (dealerCard3_val == 11) {
    deHasAce = true;
    //2nd card not a 10
    dealerCard3_val = cards.aceCheck(dealerCard4_val);
  }
  if (dealerCard4_val == 11) {
    deHasAce = true;
    //2nd card not a 10
    dealerCard4_val = cards.aceCheck(dealerCard3_val);
  }
  //  ace check ends

  //   //add2 val
  player1Score1 = cards.addCards2(playerCard1_val, playerCard2_val);
  dealerScore = cards.addCards2(dealerCard3_val, dealerCard4_val);
  deal = false;

  if (player1Score1 == 21 && dealerScore != 21) {
    player_status = "PLAYER WINS";
    dealer_status = "Dealer LOSE";
    game_status = "Game Over";
    //cash on
  } else if (player1Score1 >= 9 && player1Score1 <= 11) {
    // double down btn
    dd = true;
  } else if (player1Score1 != 21 && dealerScore == 21) {
    player_status = "PLAYER LOSE";
    dealer_status = "Dealer WINS";
    game_status = "Game Over";

    //cash off

    cash.CashGame(id, bid, player_status);
  } else if (player1Score1 == 21 && dealerScore == 21) {
    player_status = "PLAYER WINS";
    dealer_status = "Dealer WINS";
    draw = true;
    game_status = "Game Over";
    //no cash
  }

  // enable split
  if (playerCard1_val == playerCard2_val) {
    //split is true
    split = true;
  }

  let body = {
    playerCards: [
      {
        card: [playerCard1_txt, playerCard2_txt],
        points: player1Score1,
        status: player_status,
        split: split,
        DD: dd,
        hit: hit,
        p1HasAce: p1HasAce,
        bet: bet,
      },
    ],
    dealerCards: [
      {
        card: [dealerCard3_txt, dealerCard4_txt],
        points: dealerScore,
        deHasAce: deHasAce,
        status: dealer_status,
      },
    ],
    game_status: game_status,
    draw: draw,
    user_id: user_id,
  };
  //console.log("dealCards #232", body);
  return body;
}

// // Gets Deal

async function deal(req, res) {
  let { error } = gameValidation(req.body);

  if (error) {
    let msg = { message: "Error:" + error.details[0].message };
    return res.status(400).json(msg);
  } else {
    //  Save to server
    try {
      //console.log("bet", req.body.bet);
      let body = dealCards(req.body.id, req.body.bet);
      //console.log("dealCards #435", body);
      let newGame = new Game({
        playerCards: body.playerCards[0],
        dealerCards: body.dealerCards[0],
        game_status: body.game_status,
        draw: body.draw,
        user_id: body.user_id,
        bet: req.body.bet,
      });
      //console.log("dealCards", newGame);
      //todo save game off
      let saveGame = await newGame.save();
      if (saveGame) {
        //console.log("saveGame", saveGame);
        if (saveGame.game_status !== "Game Over") {
          saveGame.dealerCards.card[0] = "";
          saveGame.dealerCards.points = "";
          saveGame.dealerCards.deHasAce = "";
        }
        res.status(201).json(saveGame);
      } else {
        throw new Error("Didn't find game");
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = {
  deal,
};
