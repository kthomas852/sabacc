const io = require('../server').io

module.exports = function(socket){
    console.log('Chat socket hit')
    io.on("connection", function(socket) {
        console.log("a user connected "+ socket.id);
        socket.on("chat-message", function(data){
          io.sockets.emit('server-message', data)
          console.log("data-sent", data);
        });
      
        socket.on("disconnect", function() {
          console.log("user disconnected");
        });
      });
      
      ios.on("connection", dataSocketManager)
}