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

    cardDraw: async function(req, res){
        let sendCard = 0
        let deckObj = []
        await db.Table
            .findOne({_id: req})
            .then((obj) => {
                sendCard = obj.deck.pop();
                deckObj = obj
                console.log("objects: " + sendCard)
            })
            .catch(err=> console.log("error happened: " + err))
            // console.log(deckObj)
            return sendCard
    },

    cardPop: function(req){
        db.Table
            .findOneAndUpdate({_id: req}, {$pop: {deck: 1}}, (err, doc)=>{
                if(err){
                    console.log("Error: " + err)
                }
                console.log(doc.deck)
            })
            .catch(err=> console.log("error happened: " + err))
    },

    threeCardDraw: async function(req, res){
        let sendCards = []
        let deckObj = []
        await db.Table
            .findOne({_id: req})
            .then((obj) => {
                let inTemp = []
                inTemp.push(obj.deck.pop());
                inTemp.push(obj.deck.pop());
                inTemp.push(obj.deck.pop());
                sendCards = inTemp
                deckObj = obj
                console.log("objects: " + sendCards)
            })
            .catch(err=> console.log("error happened: " + err))
            // console.log(deckObj.deck)
            return sendCards
    },

    threeCardPop: function(req){
        db.Table
            .findOneAndUpdate({_id: req}, {$pop: {deck: 1}}, (err, doc)=>{
                if(err){
                    console.log("Error: " + err)
                }
                console.log(doc.deck)
            })
            .catch(err=> console.log("error happened: " + err))
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