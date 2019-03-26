const db = require("../models");
const help = require("../scripts/helper")

module.exports={
    findAll: function(req, res) {
        db.Table
        .find(req.query)
        .sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    findOne: function(req, res) {
        db.User
            .findOne({_id: req.params.id})
            .then((dbModel) => {
                res.json(dbModel)
                console.log(dbModel)
            })
            .catch(err => res.status(422).json(err));
    },

    cardDraw: function(req, res){
        db.Table
            .findOne(_id = req.params.id)
            .then((obj) => {
                let sendCard = obj.deck.pop();
                res.json(sendCard)
                console.log(sendCard)
            })
            .findOneAndUpdate(_id = req.params.id, obj.pop())
            .catch(err=> res.status(422).json(err) )
    },

    shuffleDeck: function (req, res){
        db.Table
            .findOneAndUpdate(_id = req.params.id, req.body)
            .then((dbModel)=>{})
            .catch()
    },

    create: function(req, res) {
        const body = {
            players:[],
            deck: help.sabaccDeck(),
            pot: 0,
            sabaccPot: 0,
            currentMaxBet: 0
        }
        db.Table
          .create(body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
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