import axios from "axios";

export default {
  // Gets all Users
  getUsers: function() {
    return axios.get("/api/user");
  },
  // Gets the user with the given id
  getUser: function(email, obj) {
    return axios.put("api/user/"+ email, obj)
  },
  // Deletes the user with the given id
  deleteUser: function(email, password) {
    return axios.delete("/api/user/" + email + password);
  },
  // Saves a user to the database
  saveUser: function(userData) {
    return axios.post("/api/user", userData);
  },
  //Adds player to an existing table
  newPlayer: function(tableID, player) {
    return axios.put("/api/table/" + tableID, player);
  },
  //Gets List of Top players
  getTop: function(){
    return axios.get("/api/top");
  },
  //draws card for that game
  nextCard: function(tableID){
    return axios.get("/api/table/" + tableID);
  }
};
