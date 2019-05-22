const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const socket = require("socket.io");
const PORT = process.env.PORT || 3001;
const WEBPORT = 3002;
const chatSocketManager = require('./controllers/SocketManager');
const table = require('./controllers/TableController');

const serverChat = app.listen(WEBPORT, function(){console.log("websocket listening on "+ WEBPORT)})
const io = module.exports.io = socket(serverChat)

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/public"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/sabacc");

//Creates socket.io link to server
//--------------------------------------------------------------------------------
// io.on("connection", SocketManager)
  //Chat listener
io.on("connection", function(socket) {
  console.log("a user connected "+ socket.id);
  socket.on("chat-message", function(data){
    io.sockets.emit('server-message', data)
  });
  //card draw listener
  socket.on('card-call', function(tableId, currentHand, sendingPlayer){
    let cards = currentHand
    table.cardDraw(tableId).then((card)=>{
      cards.push(card)
      io.sockets.emit(`${sendingPlayer}next-card`, cards)
    })
    .catch((err)=>{console.log(err)})
    table.cardPop(tableId).then((res)=>{
      table.roundCheck(tableId, res, cards)
        .then((data)=>{
          io.sockets.emit(`round-info`, data)
        })
    })
    console.log("card popped")
  })
  //initial three card listener
  socket.on('take-three', function(data, currentHand, sendingPlayer){
    let cards = currentHand
    table.threeCardDraw(data).then((card)=>{
      let final = cards.concat(card)
      io.sockets.emit(`${sendingPlayer}get-three`, final)
    })
    .catch((err)=>{console.log(err)})
    table.threeCardPop(data)
    console.log("3 cards popped")
  })
  //Shuffle deck listener
  socket.on('shuffle', function(data){
      table.shuffleDeck(data._tableID).then((deck)=>{
          io.sockets.emit('new-deck', deck)
      })
  })
  //bet listener
  socket.on('raise', function(sendingPlayer){
      table.raise(data._tableID).then((bet)=>{
          io.sockets.emit(`${sendingPlayer}bet-raised`, bet)
      })
  })
  //Round Listener
  socket.on('round-call', function(id, data, hand){
    table.roundCheck(id, data, hand).then((res)=>{
      io.sockets.emit(`round-info`, res)
      io.sockets.emit(`${table.checkTurn()}my-turn`)
    })
  })
  //Listener for Player leaving table
  socket.on('remove-player-@table', function(id, player){
    table.removePlayer(id, player)
  })
  //Table information Listener
  socket.on('table-info', function(id, sendingPlayer){
    table.getTableInfo(id).then((res)=>{
      io.sockets.emit(`${sendingPlayer}table-info-back`, res)
    })
  })
  //Fold hand listener
  socket.on('fold-hand', function(id, sendingPlayer){
    table.foldHand(id, sendingPlayer).then(()=>{
      io.sockets.emit(`${sendingPlayer}hand-folded`)
    })
  })
  

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});
//--------------------------------------------------------------------------

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
