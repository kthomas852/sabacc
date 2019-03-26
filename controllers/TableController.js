const db = require("../models");
const help = require("../scripts/helper")

// console.log(help.sabaccDeck())
module.exports={
    findAll: function(req, res) {
        db.Table
            .findAll()
            .sort()
            .then()
            .catch()
    },

    findOne: function(req, res) {
        console.log("Table controller hit Successfully")
        db.Table
            .findOne(_id = req.params.id)
            .sort()
            .then()
            .catch()
    },

    cardDraw: function(req, res){
        db.Table
            .findOne(_id = req.params.id)
            .then((obj) => {
                let sendCard = obj.deck.pop();
                return sendCard
            })
            .catch(err=> res.status(422).json(err) )
    },

    shuffleDeck: function (req, res){
        db.Table
            .findOneAndUpdate(_id = req.params.id, req.body)
            .then((dbModel)=>{})
            .catch()
    },

    create: function(req, res) {
        db.Table
            .findAll()
            .sort()
            .then()
            .catch()
    },

    update: function(req, res) {
        db.Table
            .findAll()
            .sort()
            .then()
            .catch()
    },

    remove: function(req, res) {
        db.Table
            .findAll()
            .sort()
            .then()
            .catch()
    }


}