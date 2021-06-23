const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    playerCards:
    {
        card: "array",
        points: { type: Number, required: true, default: 0 },
        status: { type: Boolean, required: true, default: false },
        split: { type: Boolean, required: true, default: false },
        DD: { type: Boolean, required: true, default: false },
        hit: { type: Number, required: true, default: 0 },
        p1HasAce: { type: Boolean, required: true, default: false },
        bet: { type: Number, required: true, default: 0 }
    },
    game_status: { type: String, required: true, default: "Not Playing" },
    draw: { type: Boolean, required: true, default: false },
    user_id: { type: String },
    start_game_Date: {
        type: Date,
        required: true,
        default: Date.now
    },
    end_game_Date: {
        type: Date,
        required: true,
        default: Date.now
    }
}, { collection: 'game' })

module.exports = mongoose.model('GameHit', gameSchema)