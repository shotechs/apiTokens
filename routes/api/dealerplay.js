var cards = require("./cards");
var won = require("./whoWon");

function GoDealerplay(id, Game) {
  // hand as of now
  //Current Game
  playingGame = Game;

  // dealer to true
  playingGame.dealerCards.status = true;

  //go till more then 17
  while (playingGame.dealerCards.points < 17) {
    const hitCard = cards.getCard();
    //get card array
    const card = playingGame.dealerCards.card;
    //put card in array
    card.push(hitCard);
    playingGame.dealerCards.card = card;

    let dealerCard_val_txt = hitCard.substring(1, 3);
    let dealerCard_val = parseInt(cards.cardnumber1(dealerCard_val_txt));
    if (dealerCard_val == 11) {
      playingGame.dealerCards.deHasAce = true;
      dealerCard_val = cards.aceCheck(dealerCard_val);
    }
    playingGame.dealerCards.points =
      playingGame.dealerCards.points + dealerCard_val;
  }
  if (playingGame.dealerCards.points >= 17) {
    // player to false
    playingGame.status = false;
    const winner = won.whoWon(
      id,
      playingGame.dealerCards.points,
      playingGame.points,
      playingGame
    );
    return winner;
  }
  return playingGame;
}

// Gets dealer Play
const dealerplay = async (req, res) => {
  const gamePlaying = res.game;
  if (gamePlaying.game_status != "Game Over") {
    let dealerPlaying = await GoDealerplay(req.body.id, gamePlaying);
    dealerPlaying.end_game_Date = new Date();
    try {
      // todo save dealer playing
      const updatedGame = await dealerPlaying.save();
      res.json(updatedGame);
      //  res.json(dealerPlaying)
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.status(200).json({ message: "Game Over" });
  }
};

module.exports = {
  dealerplay,
};
