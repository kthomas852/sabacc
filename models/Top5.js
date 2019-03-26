const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const top5Schema = new Schema({
    first: {type: String, required: true},
    second: {type: String, required: true},
    third: {type: String, required: true},
    forth: {type: String, required: true},
    fifth: {type: String, required: true}
})

const Top5 = mongoose.model("Top5", top5Schema);

module.exports = Top5;