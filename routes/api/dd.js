function DD(Game, hand) {
  //Current Game

  playingGame = Game;

  if (playingGame.game_status != "Game Over") {
    if (hand == 1 && playingGame.playerCards.DD == true) {
      playingGame.playerCards.DD = false;
      playingGame.playerCards.bet = 2 * playingGame.playerCards.bet;

      // playerCards get hit

      playingGame.playerCards.hit++;

      //get card sj
      const hit_card_txt = getCard();
      const hit_card_txt_val = hit_card_txt.substring(1, 3);
      const hit_card_val = parseInt(cardnumber1(hit_card_txt_val));

      //getCard is an ace
      if (hit_card_val == 11) {
        playingGame.playerCards.p1HasAce = true;
        hit_card_val = aceCheck(playingGame.playerCards.points);
      }
      //get card array
      let card = playingGame.playerCards.card;
      //put card in array
      card.push(hit_card_txt);
      // add card to pc
      playingGame.playerCards.card = card;

      playingGame.playerCards.points =
        playingGame.playerCards.points + hit_card_val;

      // who win
      if (playingGame.playerCards.points == 21) {
        playingGame.playerCards.status = "PLAYER WINS";
        playingGame.dealerCards.status = "Dealer LOSE";
        playingGame.game_status = "Game Over";
        playingGame.end_game_Date = new Date();
      } else if (
        playingGame.playerCards.points > 21 &&
        playingGame.playerCards.p1HasAce != true
      ) {
        playingGame.playerCards.status = "PLAYER LOSE";
        playingGame.dealerCards.status = "Dealer WINS";
        playingGame.game_status = "Game Over";
        playingGame.end_game_Date = new Date();
      } else if (
        playingGame.playerCards.points < 21 &&
        playingGame.dealerCards.points > playingGame.playerCards.points
      ) {
        playingGame.playerCards.status = "PLAYER LOSE";
        playingGame.dealerCards.status = "Dealer WINS";
        playingGame.game_status = "Game Over";
        playingGame.end_game_Date = new Date();
      }
    } else if (hand == 2 && playingGame.playerCards2.DD == true) {
      playingGame.playerCards2.DD = false;
      playingGame.playerCards2.bet = 2 * playingGame.playerCards2.bet;

      playingGame.playerCards2.hit++;

      //get card sj
      const hit_card_txt = getCard();
      const hit_card_txt_val = hit_card_txt.substring(1, 3);
      const hit_card_val = parseInt(cardnumber1(hit_card_txt_val));

      //getCard is an ace
      if (hit_card_val == 11) {
        playingGame.playerCards2.p1HasAce = true;
        hit_card_val = aceCheck(playingGame.playerCards2.points);
      }
      //get card array
      let card = playingGame.playerCards2.card;
      //put card in array
      card.push(hit_card_txt);
      // add card to pc
      playingGame.playerCards2.card = card;

      playingGame.playerCards2.points =
        playingGame.playerCards2.points + hit_card_val;

      // who win
      if (playingGame.playerCards2.points == 21) {
        playingGame.playerCards2.status = "PLAYER WINS";
        playingGame.dealerCards.status = "Dealer LOSE";
        playingGame.game_status = "Game Over";
        playingGame.end_game_Date = new Date();
      } else if (
        playingGame.playerCards2.points > 21 &&
        playingGame.playerCards2.p1HasAce != true
      ) {
        playingGame.playerCards2.status = "PLAYER LOSE";
        playingGame.dealerCards.status = "Dealer WINS";
        playingGame.game_status = "Game Over";
        playingGame.end_game_Date = new Date();
      } else if (
        playingGame.playerCards2.points < 21 &&
        playingGame.dealerCards.points > playingGame.playerCards2.points
      ) {
        playingGame.playerCards2.status = "PLAYER LOSE";
        playingGame.dealerCards.status = "Dealer WINS";
        playingGame.game_status = "Game Over";
        playingGame.end_game_Date = new Date();
      }
    }
  }

  return playingGame;
}

router.patch("/dd", verify, getGame, async (req, res) => {
  const gamePlaying = res.game;
  if (gamePlaying.game_status != "Game Over") {
    DD(gamePlaying, req.body.hand);
    try {
      //    const updatedGame = await gamePlaying.save()
      //   res.json(updatedGame)

      res.json(gamePlaying);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.json({ message: "Game Over" });
  }
});

router.get("/dd2", verify, (req, res) => {
  playingGame = Game;
  res.json(DD(playingGame, 2));
});
