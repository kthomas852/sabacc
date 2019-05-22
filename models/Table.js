const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tableSchema = new Schema({
    players: [{ID: {type: String, required: true}, deltIn: {type: Boolean, required: true}}],
    deck:[{type: String, required: true}],
    pot: {type: Number, required: true},
    sabaccPot: {type: Number, required: true},
    currentMaxBet: {type: Number, required: true},
    round: [{type: Number, require: true}]
});

const Table = mongoose.model("Table", tableSchema);

module.exports = Table;