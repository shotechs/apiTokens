export function whoWon(dealerCards, playerCards) {
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
        //console.log("bet ", playingGame.bet)
        // no cash
      } else if (dealerCards > playerCards && dealerCards <= 21) {
        playingGame.dealerCards.status = "Dealer WINS";
        playingGame.playerCards[0].status = "PLAYER LOSE";
        user.cash = user.cash - playingGame.bet;
        await user.save();
        //console.log("bet ", playingGame.bet)
        //console.log("PLAYER LOSE ", user.cash)
        // console.log("PLAYER LOSE ", playingGame.playerCards[0].status)
      } else if (dealerCards < playerCards || dealerCards > 21) {
        playingGame.dealerCards.status = "Dealer LOSE";
        playingGame.playerCards[0].status = "PLAYER WINS";
        //console.log("bet ", playingGame.bet)
        user.cash = user.cash + playingGame.bet;
        await user.save();
        //console.log("PLAYER WINS ", user.cash)
        // console.log("PLAYER WINS ", playingGame.playerCards[0].status)
      }

      try {
        saveUser = await user.save();
        //console.log("saveUser ", saveUser)
        playingGame = await playingGame.save();
        //console.log("updatedGame ", updatedGame)
        return playingGame;
      } catch (error) {
        const msg = { msg: "Error Cash:" + error };
        return msg;
      }
    } catch (error) {
      console.log("Error: UserId not found", user);
      const msg = { msg: "Error: UserId not found" };
      return msg;
    }
  }

  return f();
}
