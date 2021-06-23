const game =
{

    playerCards:
    {
        card: [
            "c4", "s4",
        ],
        points: 19,
        status: true,
        split: true,
        DD: false,
        hit: 2,
        p1HasAce: false,
        bet: 3
    },
    dealerCards:
    {
        card: [
            "c4", "s4",
        ],
        points: 8,
        deHasAce: false,
        status: false
    },
    game_status: "Playing",
    draw: false

};

module.exports = game;
