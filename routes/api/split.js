function splitplay(Game) {
  //Current Game
  playingGame = Game;

  var h1_card1_txt = playingGame.playerCards.card[0];
  var h1_card2_txt = playingGame.playerCards.card[1];

  var h1_card1_txt_val = playingGame.playerCards.card[0].substring(1, 3);
  var h1_card2_txt_val = playingGame.playerCards.card[1].substring(1, 3);

  var h1_card1_val = parseInt(cardnumber1(h1_card1_txt_val));
  var h1_card2_val = parseInt(cardnumber1(h1_card2_txt_val));

  if (h1_card1_val == h1_card2_val) {
    // get 2nd card for hand 1
    hit_card_txt = getCard();
    var hit_card_txt_val = hit_card_txt.substring(1, 3);
    var hit_card_val = parseInt(cardnumber1(hit_card_txt_val));

    // h2 array back in json
    var card = [h1_card2_txt, hit_card_txt];
    playingGame.playerCards2.card = card;
    playingGame.playerCards2.bet = playingGame.playerCards.bet;
    // console.log(playingGame)

    //has ace h2
    if (hit_card_val == 11) {
      playingGame.playerCards2.p1HasAce = true;
      hit_card_val = aceCheck(h1_card2_val);
    }

    p1 = h1_card2_val + hit_card_val;
    playingGame.playerCards2.points = p1;

    playingGame.playerCards.split = false;
    playingGame.playerCards2.split = false;

    if (
      playingGame.playerCards2.points == 21 &&
      playingGame.dealerCards.points == 21
    ) {
      playingGame.playerCards2.status = "DRAW";
      playingGame.dealerCards.status = "DRAW";
      //   playingGame.dealerCards.status = "Dealer LOSE"
      //   playingGame.end_game_Date = new Date();
    } else if (playingGame.playerCards2.points == 21) {
      playingGame.playerCards2.status = "PLAYER WINS";

      //   playingGame.dealerCards.status = "Dealer LOSE"
      // playingGame.end_game_Date = new Date();
    } else if (
      playingGame.playerCards2.points > 21 &&
      playingGame.playerCards2.p1HasAce != true
    ) {
      playingGame.playerCards2.status = "PLAYER LOSE";
      //  playingGame.dealerCards.status = "Dealer WINS"
      //   playingGame.end_game_Date = new Date();
    }

    hit_card_txt = getCard();
    hit_card_txt_val = hit_card_txt.substring(1, 3);
    hit_card_val = parseInt(cardnumber1(hit_card_txt_val));

    //has ace h1
    if (hit_card_val == 11) {
      playingGame.playerCards.p1HasAce = true;
      hit_card_val = aceCheck(h1_card1_val);
    }

    card = [h1_card2_txt, hit_card_txt];

    playingGame.playerCards.points = h1_card1_val + hit_card_val;
    playingGame.playerCards.card = [h1_card1_txt, hit_card_txt];

    if (
      playingGame.playerCards.points == 21 &&
      playingGame.dealerCards.points != 21
    ) {
      playingGame.playerCards.status = "PLAYER WINS";
      //   playingGame.dealerCards.status = "Dealer LOSE"
      // playingGame.end_game_Date = new Date();
    } else if (
      playingGame.playerCards.points == 21 &&
      playingGame.dealerCards.points == 21
    ) {
      playingGame.playerCards.status = "DRAW";
      playingGame.dealerCards.status = "DRAW";
      // playingGame.end_game_Date = new Date();
    } else if (
      playingGame.playerCards.points > 21 &&
      playingGame.playerCards.p1HasAce != true
    ) {
      playingGame.playerCards.status = "PLAYER LOSE";
      // playingGame.dealerCards.status = "Dealer WINS"
      // playingGame.end_game_Date = new Date();
    }

    if (
      playingGame.playerCards.status == "PLAYER WINS" &&
      playingGame.playerCards2.status == "PLAYER WINS"
    ) {
      console.log("PLAYER WINS x2");
      playingGame.game_status = "Game Over";
      playingGame.dealerCards.status = "Dealer LOSE x2";
    } else if (
      playingGame.playerCards.status == "PLAYER WINS" ||
      playingGame.playerCards2.status == "PLAYER WINS"
    ) {
      console.log("PLAYER WINS x1");
      playingGame.dealerCards.status = "Dealer LOSE x1";
    } else if (
      playingGame.playerCards.status == "PLAYER LOSE" &&
      playingGame.playerCards2.status == "PLAYER LOSE"
    ) {
      console.log("PLAYER LOSE x2");
      playingGame.dealerCards.status = "Dealer WINS x2";
      playingGame.game_status = "Game Over";
    } else if (
      playingGame.playerCards.status == "PLAYER LOSE" ||
      playingGame.playerCards2.status == "PLAYER LOSE"
    ) {
      console.log("PLAYER LOSE x1");
      playingGame.dealerCards.status = "Dealer WINS x1";
    }
  }

  return playingGame;
}

// Gets split Play
router.patch("/split", verify, getGame, async (req, res) => {
  const gamePlaying = res.game;
  gamePlaying.end_game_Date = new Date();

  if (gamePlaying.game_status != "Game Over") {
    let splitGame = splitplay(gamePlaying);
    splitGame.end_game_Date = new Date();
    try {
      //    const updatedGame = await splitGame.save()
      //    res.json(updatedGame)
      //res.json(splitGame)
      res.status(200).json(splitGame);
    } catch (err) {
      res.status(400).json({ message: "Error" + err.message });
    }
  } else {
    res.json({ message: "Game Over" });
  }
});
