const User = require("../../model/User");

function whoWon(id, dealerCards, playerCards, playingGame) {
  playingGame.game_status = "Game Over";

  let handNum = 0;
  let user;
  async function f() {
    try {
      // get user
      user = await User.findOne({ _id: playingGame.user_id });
      // math cards and cash
      if (dealerCards == playerCards) {
        playingGame.dealerCards.status = "DRAW";
        playingGame.playerCards[0].status = "DRAW";
        // no cash
      } else if (dealerCards > playerCards && dealerCards <= 21) {
        playingGame.dealerCards.status = "Dealer WINS";
        playingGame.playerCards[0].status = "PLAYER LOSE";
        user.cash = user.cash - playingGame.bet;
      } else if (dealerCards < playerCards || dealerCards > 21) {
        playingGame.dealerCards.status = "Dealer LOSE";
        playingGame.playerCards[0].status = "PLAYER WINS";
        user.cash = user.cash + playingGame.bet;
      }

      try {
        saveUser = await user.save();
        playingGame = await playingGame.save();
        return playingGame;
      } catch (error) {
        const msg = { msg: "Error Cash:" + error };
        return msg;
      }
    } catch (error) {
      console.log("Error: ", error);
      const msg = { msg: "Error: " + error };
      return msg;
    }
  }

  return f();
}

module.exports = { whoWon };
