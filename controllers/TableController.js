const db = require("../models");
const help = require("../scripts/helper")

let currentRound = [0,0];
let playersAtTable = [];
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
            })
            .catch(err=> console.log("error happened: " + err))
        // console.log(deckObj)
        return sendCard
    },

    cardPop: async function(req){
        let final = {}
        await db.Table
            .findOneAndUpdate({_id: req}, {$pop: {deck: 1}}, (err, doc)=>{
                if(err){
                    console.log("Error: " + err)
                }
            })
            .then(res=> final = {
                round: res.round,
                player: res.players
            })
            .catch(err=> console.log("error happened: " + err))
        return final
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
            })
            .catch(err=> console.log("error happened: " + err))
        return sendCards
    },

    threeCardPop: function(req){
        db.Table
            .findOneAndUpdate({_id: req}, {$pop: {deck: 1}}, (err, doc)=>{
                if(err){
                    console.log("Error: " + err)
                }
            })
            .findOneAndUpdate({_id: req}, {$pop: {deck: 1}}, (err, doc)=>{
                if(err){
                    console.log("Error: " + err)
                }
                // console.log(doc.deck)
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
          .then((dbModel) => {
            //   setTimeout(() => {
            //       help.tableDestruct(dbModel._id, playersAtTable, this.test)
            //   }, 300000);
            help.tableDestruct(dbModel._id, playersAtTable, this.test)
              res.json(dbModel)
            })
          .catch(err => res.status(422).json(err));
    },

    update: function(req, res) {
        db.Table
            .findOneAndUpdate({_id: req.params.id}, {$push: {players: {ID: req.body.player, deltIn: true}}})
            .then((currentTable)=>{
                console.log("player added to table: ")
                playersAtTable = currentTable.players
                currentRound = currentTable.round
            })
            .catch((err)=> console.log("Error in the table update"))
    },

    remove: function(id) {
        db.Table
            .findOneAndRemove({_id: id})
            .then(dbModel=> console.log('Deleted!')/*res.json(dbModel)*/)
            .catch(err => res.status(422).json(err))
    },

    roundCheck: async function(id, info, hand){
        let roundObj = {
            round: [0,0],
            player:''
        };
        //if the round[1] equal # of players then calculate the win
        //else proceed to next player or next round
        console.log("info: round " + JSON.stringify(currentRound) + " players " + playersAtTable.length)
        //if((info.round[0] === 3) && (info.round[1] === info.player.length - 1)){
        if((currentRound[0] === 3) && (currentRound[1] === playersAtTable.length - 1)){
            //Checks who won and returns winning players id
            console.log("Win")
            nextPlay = checkWin()
            round = [7, 7]

        // }else if(info.round[1] >= info.player.length - 1){
        }else if(currentRound[1] >= playersAtTable.length - 1){
            console.log("if else: " + id)
            await db.Table
                .findOneAndUpdate({_id: id}, {$set: {round: [currentRound[0] + 1, 0]}})
                .then((currentTable)=>{
                    console.log("after call: " + currentTable.round)
                    roundObj.player = currentTable.players.length
                    roundObj.round = currentTable.round
                    playersAtTable = currentTable.players
                })
                .catch((err)=>{console.log("Error updating Round: " + err)})

        }else{
            console.log("Else: " + id)
            await db.Table
                .findOneAndUpdate({_id: id}, {$set: {round: [currentRound[0], currentRound[1] + 1]}})
                .then((currentTable)=>{
                    roundObj.player = currentTable.players.length
                    roundObj.round = currentTable.round
                    playersAtTable = currentTable.players
                })
                .catch((err)=>{console.log("Error updating Round: " + err)})
        }
        console.log("obj: " + JSON.stringify(roundObj))
        //This counter seems to be behind by one
        //Also sometimes seems to count backwards??? Da Fuq
        currentRound = roundObj.round;
        return roundObj
    },

    removePlayer: function(tableId, playerId){
        db.Table
            .findOneAndUpdate({_id: tableId}, {$pull: {players: {ID: playerId}}})
            .then((res)=> console.log(`Player removed from table`))
            .catch((err)=>{console.log("Error Removing Player from table")})
    },

    getTableInfo: async function(tableId){
        let final = {};
        await db.Table
            .findOne({_id: tableId})
            .then((res)=> final = {
                round: res.round,
                player: res.players.length
            })
            .catch((err)=>{console.log("NO table found")})
        return final;
    },

    foldHand: function(tableId, playerId){
        db.Table
            .findOneAndUpdate({_id: tableId, players: playerId}, {$set: {'players.$.deltIn': false}})
            .then((res)=>console.log("Hand folded for: " + JSON.stringify(res.players)))
            .catch((err)=>{console.log("Cound NOT fold hand")})
    },

    checkTurn: function(){
        let player;
        let index = currentRound[1]
        //Checks to see if player is still in the game
        // if(){
        //     player = playersAtTable(index).ID
        // }
        console.log(playersAtTable[0].ID)
        console.log("round: " + currentRound[1])
        player = playersAtTable[index].ID
        return player
    },

    test: function(){
        console.log("This was a test and it PASSED!!!")
    }


}