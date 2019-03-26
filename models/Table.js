const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tableSchema = new Schema({
    players: [{type: String, required: true}],
    deck:[{type: String, required: true}],
    pot: {type: Number, required: true},
    sabaccPot: {type: Number, required: true},
    currentMaxBet: {type: Number, required: true}
});

const Table = mongoose.model("Table", tableSchema);

module.exports = Table;