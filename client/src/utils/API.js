import axios from "axios";

export default {
  // Gets all Users
  getUsers: function() {
    return axios.get("/api/user");
  },
  // Gets the user with the given id
  getUser: function(email, obj) {
    return axios.put("api/user/"+ email, obj).then((data)=>{
      console.log(data.data);
      localStorage.setItem('data', JSON.stringify({
        loggedInPlayer: data.data._id,
        tableNumber: ''
      }));
    })
  },
  // Deletes the user with the given id
  deleteUser: function(email, password) {
    return axios.delete("/api/user/" + email + password);
  },
  // Saves a user to the database
  saveUser: function(userData) {
    return axios.post("/api/user", userData);
  },
  //Gets List of Top players
  getTop: function(){
    return axios.get("/api/top");
  },
  //Gets list of active tables
  getTables: function(){
    return axios.get("/api/table")
  },
  // Gets a single table with an ID
  getMyTable: function(id) {
    console.log(id)
    return axios.get("api/user/"+ id)
  },
  //Creates new table
  newTable: function(){
    console.log('new table made')
    return axios.post("/api/table")
  },
  //gets table info
  nextCard: function(tableID){
    console.log(tableID)
    return axios.get("/api/table/" + tableID);
  },
  //Adds player to an existing table
  newPlayer: function(tableID, player) {
    return axios.put("/api/table/" + tableID, player);
  },
  wrapper: function(props){
    console.log("Wrapper fired!: "+ props)
    return props
  }
};
