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
    dealerCards:
    {
        card: [String],
        points: { type: Number, required: true, default: 0 },
        deHasAce: { type: Boolean, required: true, default: false },
        status: { type: Boolean, required: true, default: false }
    },
    game_status: { type: String, required: true, default: "Not Playing" },
    draw: { type: Boolean, required: true, default: false },

    playerCards2: {
        card: [String],
        points: { type: Number, required: true, default: 0 },
        status: { type: Boolean, required: true, default: false },
        split: { type: Boolean, required: true, default: false },
        DD: { type: Boolean, required: true, default: false },
        hit: { type: Number, required: true, default: 0 },
        p1HasAce: { type: Boolean, required: true, default: false },
        bet: { type: Number, required: true, default: 0 }
    },

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

module.exports = mongoose.model('GameH2', gameSchema)