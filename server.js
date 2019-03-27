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
  app.use(express.static("client/build"));
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
    console.log("data-sent", data);
  });
  //card draw listener
  socket.on('card-call', function(data, currentHand){
    let cards = currentHand
    console.log("here here here: "+ data)
    table.cardDraw(data).then((card)=>{
      console.log("Card: " + card)
      cards.push(card)
      io.sockets.emit('next-card', cards)
    })
    .catch((err)=>{console.log(err)})
    table.cardPop(data)
    console.log("card popped")
  })
  //initial three card listener
  socket.on('take-three', function(data, currentHand){
    let cards = currentHand
    console.log("three three three: "+ data)
    table.threeCardDraw(data).then((card)=>{
      console.log("Cards: " + card)
      let final = cards.concat(card)
      console.log("Current hand: " + final)
      io.sockets.emit('get-three', final)
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
  socket.on('raise', function(){
      table.raise(data._tableID).then((bet)=>{
          io.sockets.emit('bet-raised', bet)
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
