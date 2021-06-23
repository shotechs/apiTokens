const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const mongoose = require("mongoose");
const verify = require("../verifyToken");

const Game = require('../../model/Game');

//const user_Id = "6096b0f6b45393b6a8e85224"

// get randon number return
const callRandom = (start, last) => {
    const number = start + Math.floor(Math.random() * last);
    return number;
}

const {
    gameValidation
} = require("../../validation/validation");


// get
const getCard = () => {
    const cardNumVal = [2, 3, 4, 5, 6, 7, 8, 9, 10, "j", "q", "k", "a"];
    const cardSuVal = ["h", "d", "c", "s"];

    // Get card 1
    const r1 = callRandom(1, cardNumVal.length - 1);
    const r2 = callRandom(1, cardSuVal.length - 1);

    const card = cardSuVal[r2] + cardNumVal[r1];

    return card;
}

const cardnumber1 = (cardnumber) => {
    //new add 2 number
    switch (cardnumber) {
        case "a":
            return 11;
            break;

        case "j":
            return 10;
            break;

        case "q":
            return 10;
            break;
        case "k":
            return 10;
            break;
        case 10:
            return 10;
            break;
        default:
            return cardnumber;
            break;
    }
}


//check if ace
function aceCheck(card_val2) {
    if (card_val2 > 10) {
        return 1;
    } else {
        return 11;
    }
}


const dealCards = (id, bet) => {

    let user_id = id;
    let playerCard1_txt = getCard();
    let playerCard2_txt = getCard();
    let dealerCard3_txt = getCard();
    let dealerCard4_txt = getCard();

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
    let playerCard1_val = parseInt(cardnumber1(playerCard1_val_txt));
    let playerCard2_val = parseInt(cardnumber1(playerCard2_val_txt));
    let dealerCard3_val = parseInt(cardnumber1(dealerCard3_val_txt));
    let dealerCard4_val = parseInt(cardnumber1(dealerCard4_val_txt));

    let game_status = "Playing"
    let dd = false
    let player_status = true
    let dealer_status = false
    let split = false
    let hit = 2
    let draw = false
    let p1HasAce = false;
    let deHasAce = false;

    //   //show double 2 cards are same
    if (playerCard1_val_txt === playerCard2_val_txt) {
        //split is true
        split = true
    }
    //  ace check
    if (playerCard1_val == 11) {
        p1HasAce = true;
        //1st card not a 10
        playerCard1_val = aceCheck(playerCard2_val);
    }
    if (playerCard2_val == 11) {
        p1HasAce = true;
        //2nd card not a 10
        playerCard2_val = aceCheck(playerCard1_val);
    }

    if (dealerCard3_val == 11) {
        deHasAce = true;
        //2nd card not a 10
        dealerCard3_val = aceCheck(dealerCard4_val);
    }
    if (dealerCard4_val == 11) {
        deHasAce = true;
        //2nd card not a 10
        dealerCard4_val = aceCheck(dealerCard3_val);
    }
    //  ace check ends

    //   //add2 val
    player1Score1 = addCards2(playerCard1_val, playerCard2_val);
    dealerScore = addCards2(dealerCard3_val, dealerCard4_val);
    deal = false;

    if (player1Score1 == 21 && dealerScore != 21) {
        player_status = "PLAYER WINS"
        dealer_status = "Dealer LOSE"
        game_status = "Game Over"
        //cash on



    } else if (player1Score1 >= 9 && player1Score1 <= 11) {
        // double down btn
        dd = true

    } else if (player1Score1 != 21 && dealerScore == 21) {
        player_status = "PLAYER LOSE"
        dealer_status = "Dealer WINS"
        game_status = "Game Over"

        //cash off

        CashGame(id, bid, player_status)

    }
    else if (player1Score1 == 21 && dealerScore == 21) {
        player_status = "PLAYER WINS"
        dealer_status = "Dealer WINS"
        draw = true
        game_status = "Game Over"
        //no cash
    }

    // enable split
    if (playerCard1_val == playerCard2_val) {
        //split is true
        split = true
    }

    let body = {
        playerCards: [
            {
                card: [
                    playerCard1_txt,
                    playerCard2_txt
                ],
                points: player1Score1,
                status: player_status,
                split: split,
                DD: dd,
                hit: hit,
                p1HasAce: p1HasAce,
                bet: bet
            }
        ],
        dealerCards: [
            {
                card: [
                    dealerCard3_txt,
                    dealerCard4_txt
                ],
                points: dealerScore,
                deHasAce: deHasAce,
                status: dealer_status
            }
        ],
        game_status: game_status,
        draw: draw,
        user_id: user_id
    }
    return (body)
}


function CashGame(user_id, betOn, cashT, status) {

    if (status === "PLAYER LOSE") {
        cashT = cashT - betOn
    } else if (status === "PLAYER WINS") {
        cashT = cashT + betOn
    }

    // update the user
}


function addCards2(Card1_val, Card2_val) {
    return Card1_val + Card2_val;
}
//check if ace
function aceCheck(card_val2) {
    if (card_val2 > 10) {
        return 1;
    } else {
        return 11;
    }
}

function playerhit(id, Game, playerHand) {

    //id, game that is playing
    // Game is obj
    // playerHand which hand hit


    // hand as of now
    //Current Game
    playingGame = Game

    // console.log("game", playingGame);
    // start
    if (playingGame.game_status != "Game Over") {
        if (playerHand == "H1") {
            playerCards = playingGame.playerCards
        } else if (playerHand == "H2") {
            playerCards = playingGame.playerCards2
        }
        // first hit int
        //var hitCount = playingGame.playerCards.hit
        playingGame.playerCards[0].hit++

        //get card sj
        const hit_card_txt = getCard();
        const hit_card_txt_val = hit_card_txt.substring(1, 3);
        const hit_card_val = parseInt(cardnumber1(hit_card_txt_val));

        // const hit_card_val = 11

        //getCard is an ace
        if (hit_card_val == 11) {
            if (playerHand == "H1") {
                playingGame.playerCards[0].p1HasAce = true;
                hit_card_val = aceCheck(playingGame.playerCards[0].points);
            } else if (playerHand == "H2") {
                p1HasAce = true;
                playerCards = { ...playingGame.playerCards[0].p1HasAce, p1HasAce };
                hit_card_val = aceCheck(playingGame.playerCards[0].points);
                console.log("game playerCards " + playerCards);
            }
        }


        //get card array
        const card = playingGame.playerCards[0].card;
        //put card in array
        card.push(hit_card_txt);

        // add card to pc
        playingGame.playerCards[0].card = card;
        playingGame.playerCards[0].points = playingGame.playerCards[0].points + hit_card_val
        //player win
        if (playingGame.playerCards[0].points == 21) {
            playingGame.playerCards[0].status = "PLAYER WINS"
            playingGame.dealerCards.status = "Dealer LOSE"
            playingGame.game_status = "Game Over"
            playingGame.end_game_Date = new Date();

        } else if (playingGame.playerCards[0].points > 21 && playingGame.playerCards[0].p1HasAce != true) {
            playingGame.playerCards[0].status = "PLAYER LOSE"
            playingGame.dealerCards.status = "Dealer WINS"
            playingGame.game_status = "Game Over"
            playingGame.end_game_Date = new Date();

        }

        // send back obj
        return playingGame;
    } else {
        // console.log("Game Over already");
        return { msg: "Game Over" }

    }

}

function dealerplay(id, Game) {


    // hand as of now
    //Current Game
    playingGame = Game


    // player to false
    playingGame.playerCards.status = false;

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

        const dealerCard_val_txt = hitCard.substring(1, 3);
        const dealerCard_val = parseInt(cardnumber1(dealerCard_val_txt));
        if (dealerCard_val == 11) {

            playingGame.dealerCards.deHasAce = true;
            dealerCard_val = aceCheck(dealerCard_val);
        }
        playingGame.dealerCards.points = playingGame.dealerCards.points + dealerCard_val
    }
    if (playingGame.dealerCards.points >= 17) {
        whoWon(playingGame.dealerCards.points, playingGame.playerCards.points)
    }
    console.log("game won" + playingGame);
    return playingGame;

}

function whoWon(dealerCards, playerCards) {

    if (dealerCards == playerCards) {
        playingGame.game_status = "Game Over"
        playingGame.playerCards.status = "DRAW"
        playingGame.dealerCards.status = "DRAW"
    } else if (dealerCards > playerCards && dealerCards <= 21) {
        //console.log("dealerCards");
        playingGame.game_status = "Game Over"

        playingGame.playerCards.status = "PLAYER LOSE"
        playingGame.dealerCards.status = "Dealer WINS"

    }
    else if (dealerCards < playerCards || dealerCards > 21) {
        //console.log("playerCards");
        playingGame.game_status = "Game Over"
        playingGame.playerCards.status = "PLAYER WINS"
        playingGame.dealerCards.status = "Dealer LOSE"
    }



    // user cash val
    // if (cashTxt == 0) {
    //     Game Over();
    // }


}



function GameOver() {
    //go to pay more page b/c cash is out

    console.log("cash at 0 for " + playingGame.user_id);
    //User.cash = 500;
}

function splitplay(Game) {

    //Current Game
    playingGame = Game


    var h1_card1_txt = playingGame.playerCards.card[0]
    var h1_card2_txt = playingGame.playerCards.card[1]

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
        var card = [h1_card2_txt, hit_card_txt]
        playingGame.playerCards2.card = card
        playingGame.playerCards2.bet = playingGame.playerCards.bet
        // console.log(playingGame)

        //has ace h2
        if (hit_card_val == 11) {
            playingGame.playerCards2.p1HasAce = true;
            hit_card_val = aceCheck(h1_card2_val)
        }


        p1 = h1_card2_val + hit_card_val
        playingGame.playerCards2.points = p1

        playingGame.playerCards.split = false
        playingGame.playerCards2.split = false

        if (playingGame.playerCards2.points == 21 && playingGame.dealerCards.points == 21) {
            playingGame.playerCards2.status = "DRAW"
            playingGame.dealerCards.status = "DRAW"
            //   playingGame.dealerCards.status = "Dealer LOSE"
            // playingGame.game_status = "Game Over"
            //   playingGame.end_game_Date = new Date();
        } else if (playingGame.playerCards2.points == 21) {
            playingGame.playerCards2.status = "PLAYER WINS"

            //   playingGame.dealerCards.status = "Dealer LOSE"
            // playingGame.game_status = "Game Over"
            // playingGame.end_game_Date = new Date();
        } else if (playingGame.playerCards2.points > 21 && playingGame.playerCards2.p1HasAce != true) {
            playingGame.playerCards2.status = "PLAYER LOSE"
            //  playingGame.dealerCards.status = "Dealer WINS"
            // playingGame.game_status = "Game Over"
            //   playingGame.end_game_Date = new Date();
        }



        hit_card_txt = getCard();
        hit_card_txt_val = hit_card_txt.substring(1, 3);
        hit_card_val = parseInt(cardnumber1(hit_card_txt_val));

        //has ace h1
        if (hit_card_val == 11) {
            playingGame.playerCards.p1HasAce = true;
            hit_card_val = aceCheck(h1_card1_val)
        }

        card = [h1_card2_txt, hit_card_txt]



        playingGame.playerCards.points = h1_card1_val + hit_card_val
        playingGame.playerCards.card = [h1_card1_txt, hit_card_txt]



        if (playingGame.playerCards.points == 21 && playingGame.dealerCards.points != 21) {
            playingGame.playerCards.status = "PLAYER WINS"
            //   playingGame.dealerCards.status = "Dealer LOSE"
            // playingGame.game_status = "Game Over"
            // playingGame.end_game_Date = new Date();
        }
        else if (playingGame.playerCards.points == 21 && playingGame.dealerCards.points == 21) {
            playingGame.playerCards.status = "DRAW"
            playingGame.dealerCards.status = "DRAW"
            // playingGame.game_status = "Game Over"
            // playingGame.end_game_Date = new Date();
        }
        else if (playingGame.playerCards.points > 21 && playingGame.playerCards.p1HasAce != true) {
            playingGame.playerCards.status = "PLAYER LOSE"
            // playingGame.dealerCards.status = "Dealer WINS"
            // playingGame.game_status = "Game Over"
            // playingGame.end_game_Date = new Date();
        }


        if (playingGame.playerCards.status == "PLAYER WINS" && playingGame.playerCards2.status == "PLAYER WINS") {
            console.log("PLAYER WINS x2")
            playingGame.game_status = "Game Over"
            playingGame.dealerCards.status = "Dealer LOSE x2"
        } else if (playingGame.playerCards.status == "PLAYER WINS" || playingGame.playerCards2.status == "PLAYER WINS") {
            console.log("PLAYER WINS x1")
            playingGame.dealerCards.status = "Dealer LOSE x1"
        } else if (playingGame.playerCards.status == "PLAYER LOSE" && playingGame.playerCards2.status == "PLAYER LOSE") {
            console.log("PLAYER LOSE x2")
            playingGame.dealerCards.status = "Dealer WINS x2"
            playingGame.game_status = "Game Over"
        } else if (playingGame.playerCards.status == "PLAYER LOSE" || playingGame.playerCards2.status == "PLAYER LOSE") {
            console.log("PLAYER LOSE x1")
            playingGame.dealerCards.status = "Dealer WINS x1"
        }


    }

    return playingGame;
}


function DD(Game, hand) {

    //Current Game

    playingGame = Game

    if (playingGame.game_status != "Game Over") {
        if (hand == 1 && playingGame.playerCards.DD == true) {
            playingGame.playerCards.DD = false;
            playingGame.playerCards.bet = 2 * playingGame.playerCards.bet;

            // playerCards get hit

            playingGame.playerCards.hit++

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

            playingGame.playerCards.points = playingGame.playerCards.points + hit_card_val

            // who win
            if (playingGame.playerCards.points == 21) {
                playingGame.playerCards.status = "PLAYER WINS"
                playingGame.dealerCards.status = "Dealer LOSE"
                playingGame.game_status = "Game Over"
                playingGame.end_game_Date = new Date();
            } else if (playingGame.playerCards.points > 21 && playingGame.playerCards.p1HasAce != true) {
                playingGame.playerCards.status = "PLAYER LOSE"
                playingGame.dealerCards.status = "Dealer WINS"
                playingGame.game_status = "Game Over"
                playingGame.end_game_Date = new Date();
            } else if ((playingGame.playerCards.points < 21) && (playingGame.dealerCards.points > playingGame.playerCards.points)) {
                playingGame.playerCards.status = "PLAYER LOSE"
                playingGame.dealerCards.status = "Dealer WINS"
                playingGame.game_status = "Game Over"
                playingGame.end_game_Date = new Date();
            }



        } else if (hand == 2 && playingGame.playerCards2.DD == true) {
            playingGame.playerCards2.DD = false;
            playingGame.playerCards2.bet = 2 * playingGame.playerCards2.bet;

            playingGame.playerCards2.hit++

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

            playingGame.playerCards2.points = playingGame.playerCards2.points + hit_card_val

            // who win
            if (playingGame.playerCards2.points == 21) {
                playingGame.playerCards2.status = "PLAYER WINS"
                playingGame.dealerCards.status = "Dealer LOSE"
                playingGame.game_status = "Game Over"
                playingGame.end_game_Date = new Date();
            } else if (playingGame.playerCards2.points > 21 && playingGame.playerCards2.p1HasAce != true) {
                playingGame.playerCards2.status = "PLAYER LOSE"
                playingGame.dealerCards.status = "Dealer WINS"
                playingGame.game_status = "Game Over"
                playingGame.end_game_Date = new Date();
            } else if ((playingGame.playerCards2.points < 21) && (playingGame.dealerCards.points > playingGame.playerCards2.points)) {
                playingGame.playerCards2.status = "PLAYER LOSE"
                playingGame.dealerCards.status = "Dealer WINS"
                playingGame.game_status = "Game Over"
                playingGame.end_game_Date = new Date();
            }
        }
    }

    return playingGame;

}

router.patch('/dd', verify, getGame, async (req, res) => {
    const gamePlaying = res.game
    if (gamePlaying.game_status != "Game Over") {
        DD(gamePlaying, req.body.hand)
        try {
            //    const updatedGame = await gamePlaying.save()
            //   res.json(updatedGame)

            res.json(gamePlaying)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    } else {
        res.json({ message: "Game Over" })
    }

}
);

router.get('/dd2', verify, (req, res) => {
    playingGame = Game
    res.json(DD(playingGame, 2))

}
);

// // Gets Deal


router.post('/deal', verify, async (req, res) => {


    let { error } = gameValidation(req.body);
    // // res.send(error.details[0].message);

    if (error) {
        let msg = { message: 'Error:' + error.details[0].message }
        return res.status(400).json(msg);
    } else {

        //  Save to server
        try {
            //console.log("id " + req.body.id);

            let body = dealCards(req.body.id, req.body.bet)
            //console.log("game ", body);

            let newGame = new Game({
                playerCards: body.playerCards[0],
                dealerCards: body.dealerCards[0],
                game_status: body.game_status,
                draw: body.draw,
                user_id: body.user_id,
                bet: req.body.bet
            })
            //todo save game off
            let saveGame = await newGame.save();
            if (saveGame) {


                if (saveGame.game_status !== "Game Over") {
                    saveGame.dealerCards.card[0] = ""
                }


                console.log("saveGame ", saveGame);
                res.status(201).json(saveGame)
                // console.log("saveGame ", newGame);
                // res.status(201).json(newGame)
            } else {
                throw new Error("Didn't find game")
                //  res.status(404).json({ message: "Didn't find game" })
            }
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }

})



// Gets playerhit
router.patch('/playerhit', verify, getGame, async (req, res) => {

    const gamePlaying = res.game

    if (gamePlaying.game_status !== "Game Over") {
        let hitGame = playerhit(req.body.id, gamePlaying, req.body.hand)

        if (hitGame.game_status !== "Game Over") {
            hitGame.dealerCards.card[0] = ""
        } else {

        }

        try {
            //todo update hit game
            //   const updatedGame = await gamePlaying.save()
            //   res.json(updatedGame)

            res.json(hitGame)

        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    } else {
        res.json({ message: "Game Over" })
    }
});


// Gets dealer Play
router.patch('/dealerplay', verify, getGame, async (req, res) => {

    const gamePlaying = res.game
    if (gamePlaying.game_status != "Game Over") {

        let dealerPlaying = dealerplay(req.body.id, gamePlaying)
        dealerPlaying.end_game_Date = new Date();


        if (dealerPlaying.game_status !== "Game Over") {
            dealerPlaying.dealerCards.card[0] = ""
        } else {

        }


        try {
            // todo save dealer playing
            //  const updatedGame = await dealerPlaying.save()
            res.json(dealerPlaying)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }

    } else {
        res.json({ message: "Game Over" })
    }
}
);


// Gets dealer Play
router.patch('/split', verify, getGame, async (req, res) => {

    const gamePlaying = res.game
    gamePlaying.end_game_Date = new Date();

    if (gamePlaying.game_status != "Game Over") {

        let splitGame = splitplay(gamePlaying)
        splitGame.end_game_Date = new Date();
        try {
            //    const updatedGame = await splitGame.save()
            //    res.json(updatedGame)
            res.json(splitGame)

        } catch (err) {
            res.status(400).json({ message: 'Error' + err.message })
        }

    } else {
        res.json({ message: "Game Over" })
    }


}
);


router.post('/', async (req, res) => {

    try {
        //const Games = await Game.find()
        //res.json(Games)
        game = await Game.findOne({ user_id: req.body.user_id, _id: req.body._id }).exec();

        if (game) {
            res.json(game)
        } else {
            throw new Error("Didn't find game")
            //  res.status(404).json({ message: "Didn't find game" })
        }

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
);


async function getGame(req, res, next) {
    let game
    try {
        game = await Game.findOne({ user_id: req.body.user_id, _id: req.body._id }).exec();
        if (game === null) {
            return res.status(404).json({ message: 'Cannot find game' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.game = game
    next()
}
//-------------------------------
// Get Single Member
// router.get('/:id', (req, res) => {

// });

// // Create Member
// router.post('/', (req, res) => {
//     const newMember = {
//         ...req.body,
//         id: uuid.v4(),
//         status: 'active'
//     };

//     if (!newMember.name || !newMember.email) {
//         return res.status(400).json({ msg: 'Please include a name and email' });
//     }

//     members.push(newMember);
//     res.json(members);
//     // res.redirect('/');
// });



// // Delete Member
// router.delete('/:id', (req, res) => {
//     const found = members.some(idFilter(req));

//     if (found) {
//         res.json({
//             msg: 'Member deleted',
//             members: members.filter(member => !idFilter(req)(member))
//         });
//     } else {
//         res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
//     }
// });

module.exports = router;
