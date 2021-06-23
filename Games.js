const game = [
    {
        id: 1,
        playerCards: [
            {
                card1: "assets\\cards\\h5.png",
                card2: "assets\\cards\\c5.png",
                points: 10,
                status: "Playing",
                split: true,
                DD: false,
                hit: 0,
                bet: 3
            }
        ],
        dealerCards: [
            {
                card1: "assets\\cards\\h7.png",
                card2: "assets\\cards\\h3.png",
                points: 10,
                status: "Not Playing"
            }
        ],
        status: 'active'
    },
    {
        id: 2,
        playerCards: [
            {
                card1: "assets\\cards\\h5.png",
                card2: "assets\\cards\\c5.png",
                points: 10,
                status: "Playing",
                split: true,
                DD: false,
                hit: 0,
                bet: 3
            }
        ],
        dealerCards: [
            {
                card1: "assets\\cards\\h7.png",
                card2: "assets\\cards\\h3.png",
                points: 10,
                status: "Not Playing"
            }
        ],
        status: 'active'
    },
    {
        id: 3,
        playerCards: [
            {
                card1: "assets\\cards\\h5.png",
                card2: "assets\\cards\\c5.png",
                points: 10,
                status: "Playing",
                split: true,
                DD: false,
                hit: 0,
                bet: 3
            }
        ],
        dealerCards: [
            {
                card1: "assets\\cards\\h7.png",
                card2: "assets\\cards\\h3.png",
                points: 10,
                status: "Not Playing"
            }
        ],
        status: 'inactive'
    }
];

module.exports = game;
