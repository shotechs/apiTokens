var cards = require("./cards");
var cash = require("./cash");

function playerhitGame(id, Game, playerHand) {
  //id, game that is playing
  // Game is obj
  // playerHand which hand hit

  // hand as of now
  //Current Game
  playingGame = Game;

  let handNum;
  // console.log("game", playingGame);
  // start
  if (playingGame.game_status != "Game Over") {
    if (playerHand == "H1") {
      handNum = 0;
    } else if (playerHand == "H2") {
      handNum = 1;
    }
    // first hit int
    //var hitCount = playingGame.playerCards.hit
    playingGame.playerCards[handNum].hit++;

    //get card sj
    const hit_card_txt = cards.getCard();
    const hit_card_txt_val = hit_card_txt.substring(1, 3);
    let hit_card_val = parseInt(cards.cardnumber1(hit_card_txt_val));

    // const hit_card_val = 11

    //getCard is an ace
    if (hit_card_val == 11) {
      if (playerHand == "H1") {
        playingGame.playerCards[handNum].p1HasAce = true;
        hit_card_val = cards.aceCheck(playingGame.playerCards[handNum].points);
      } else if (playerHand == "H2") {
        p1HasAce = true;
        playerCards = {
          ...playingGame.playerCards[handNum].p1HasAce,
          p1HasAce,
        };
        hit_card_val = cards.aceCheck(playingGame.playerCards[handNum].points);
        //console.log("game playerCards " + playerCards);
      }
    }

    //get card array
    const card = playingGame.playerCards[handNum].card;
    //put card in array
    card.push(hit_card_txt);

    // add card to pc
    playingGame.playerCards[handNum].card = card;
    playingGame.playerCards[handNum].points =
      playingGame.playerCards[0].points + hit_card_val;
    //player win
    if (playingGame.playerCards[handNum].points == 21) {
      playingGame.playerCards[handNum].status = "PLAYER WINS";
      playingGame.dealerCards.status = "Dealer LOSE";
      playingGame.game_status = "Game Over";
      playingGame.end_game_Date = new Date();
    } else if (
      playingGame.playerCards[handNum].points > 21 &&
      playingGame.playerCards[handNum].p1HasAce != true
    ) {
      playingGame.playerCards[handNum].status = "PLAYER LOSE";
      playingGame.dealerCards.status = "Dealer WINS";
      playingGame.game_status = "Game Over";
      playingGame.end_game_Date = new Date();
    }
    // send back obj
    return playingGame;
  } else {
    // console.log("Game Over already");
    return { msg: "Game Over" };
  }
}

// Gets playerhit
const playerhit = async (req, res) => {
  const gamePlaying = res.game;

  if (gamePlaying.game_status !== "Game Over") {
    let hitGame = playerhitGame(req.body.id, gamePlaying, req.body.hand);

    // off dealer card
    if (hitGame.game_status !== "Game Over") {
      hitGame.dealerCards.card[0] = "";
    } else {
    }

    try {
      const updatedGame = await hitGame.save();
      //console.log("updatedGame", updatedGame);
      res.json(updatedGame);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else {
    res.json({ message: "Game Over" });
  }
};

module.exports = {
  playerhit,
};
