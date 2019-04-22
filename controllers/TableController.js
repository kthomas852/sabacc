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
            return sendCards
    },

    threeCardPop: function(req){
        db.Table
            // .findOneAndUpdate({_id: req}, {$pop: {deck: 1}}, (err, doc)=>{
            //     if(err){
            //         console.log("Error: " + err)
            //     }
            // })
            .findOneAndUpdate({_id: req}, {$pop: {deck: 1}}, (err, doc)=>{
                if(err){
                    console.log("Error: " + err)
                }
            })
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
            currentMaxBet: 0,
            round: [0,0]
        }
        db.Table
          .create(body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },

    update: function(req, res) {
        console.log("id into update: " + req.params.id)
        db.Table
            .findOneAndUpdate({_id: req.params.id}, {$push: {players: req.body.player}})
            .then(()=>{console.log("player added to table: ")})
            .catch((err)=> console.log("Error in the table update"))
    },

    remove: function(req, res) {
        db.Table
            .findAll()
            .sort()
            .then()
            .catch()
    },

    roundCheck: function(id, info){
        let roundObj = {
            nextPlay:'',
            round: []
        };
        //if the round[1] equal # of players then calculate the win
        //else proceed to next player or next round
        if((info.round[0] === 3) && (info.round[1] === info.player.length)){
            //Checks who won and returns winning players id
            nextPlay = checkWin()
            round = [7, 7]

        }else if(info.round[1] === info.player.length){
            db.Table
                .findOneAndUpdate({_id: id}, {round: [info.round[0] + 1, 0]})
                .then((currentTable)=>{
                    roundObj.nextPlay = currentTable.players[currentTable.round[1]]
                    roundObj.round = currentTable.round
                })
                .catch((err)=>{console.log("Error updating Round")})

        }else{
            db.Table
                .findOneAndUpdate({_id: id}, {round: [info.round[0], info.round[1] + 1]})
                .then((currentTable)=>{
                    roundObj.nextPlay = currentTable.players[currentTable.round[1]]
                    roundObj.round = currentTable.round
                })
                .catch((err)=>{console.log("Error updating Round")})
        }
        return roundObj
    }


}