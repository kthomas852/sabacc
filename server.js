const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const socket = require("socket.io");
const PORT = process.env.PORT || 3001;
const WEBPORT = 3002;

const server = app.listen(WEBPORT, function(){console.log("websocket listening on "+WEBPORT)})

const io = socket(server)
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
io.on("connection", function(socket) {
  console.log("a user connected "+socket.id);
  socket.on("chat-message", function(data){
    io.sockets.emit('server-message', data)
    console.log("data-sent", data);
  });

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});
//--------------------------------------------------------------------------

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
