export function dealerplay(id, Game) {
  // hand as of now
  //Current Game
  playingGame = Game;

  // dealer to true
  playingGame.dealerCards.status = true;

  //go till more then 17
  while (playingGame.dealerCards.points < 17) {
    const hitCard = getCard();
    //get card array
    const card = playingGame.dealerCards.card;
    //put card in array
    card.push(hitCard);
    playingGame.dealerCards.card = card;

    let dealerCard_val_txt = hitCard.substring(1, 3);
    let dealerCard_val = parseInt(cardnumber1(dealerCard_val_txt));
    if (dealerCard_val == 11) {
      playingGame.dealerCards.deHasAce = true;
      dealerCard_val = aceCheck(dealerCard_val);
    }
    playingGame.dealerCards.points =
      playingGame.dealerCards.points + dealerCard_val;
  }
  if (playingGame.dealerCards.points >= 17) {
    // player to false
    for (let game of playingGame.playerCards) {
      game.status = false;
      return whoWon(playingGame.dealerCards.points, game.points, game);
    }
    //  console.log("x.status" + playingGame);
  }

  //  console.log("game won" + playingGame);
  return playingGame;
}

// Gets dealer Play
router.patch("/dealerplay", verify, getGame, async (req, res) => {
  const gamePlaying = res.game;
  if (gamePlaying.game_status != "Game Over") {
    let dealerPlaying = await dealerplay(req.body.id, gamePlaying);
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
});
