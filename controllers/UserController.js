const db = require("../models");

// Defining methods for the Controller
module.exports = {
  findAll: function(req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findOne: function(req, res) {
    console.log(req.body)
    db.User
      .findOne({email: req.params.email})
      .then(
        dbModel => {
        if(req.body.password === dbModel.password){
        res.json(dbModel)
        console.log(`User ${dbModel.name} logged in`)
        }})
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.User
      .findOne(req.body)
      .then(mes => {
        // console.log(mes)
        if(mes !== null){
          err => res.status(500).json(err)
          console.log("Access Denied: Duplicate User")
        }else{
        db.User
          .create(req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      }})
  },
  update: function(req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
